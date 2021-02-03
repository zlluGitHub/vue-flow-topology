<template>
  <div class="flow-area" ref="flowArea" @mouseup="handlerMouseup">
    <flow-node
      v-for="(node, i) in nodes"
      :key="'node' + i"
      :id="node.id"
      :node="node"
      :style="{ top: node.y + 'px', left: node.x + 'px', cursor }"
      @context-menu="$emit('context-menu', { type: 'node', event: $event, data: node })"
    >
    </flow-node>
  </div>
</template>

<script>
import FlowNode from "./FlowNode";
import { jsPlumbConfig, flowAnchor, nodePrame, linkPrame } from "@/config/flow.config.js";
import { getUUID } from "@/utils";
export default {
  name: "FlowArea",
  components: { FlowNode },
  data() {
    return {
      jspInit: this.$store.state.jspInit,
      nodes: [],
      cursor: "move",
      connector: "",
    };
  },
  methods: {
    toggleDraggable(flowMenuObj) {
      if (flowMenuObj && flowMenuObj.type === "connection") {
        this.cursor = "crosshair";
        this.nodes.forEach((node, index) => {
          let f = this.jspInit.toggleDraggable(node.id);
          if (f) {
            this.jspInit.toggleDraggable(node.id);
          }
          let config = { ...jsPlumbConfig, ...{ anchor: flowAnchor } };
          this.jspInit.unmakeSource(node.id);
          this.jspInit.unmakeTarget(node.id);
          this.connector = flowMenuObj.connector;
          config.connector = [this.connector];
          this.jspInit.makeSource(node.id, config);
          this.jspInit.makeTarget(node.id, config);
        });
      } else {
        this.cursor = "move";
        this.nodes.forEach((node, index) => {
          let f = this.jspInit.toggleDraggable(node.id);
          if (!f) {
            this.jspInit.toggleDraggable(node.id);
          }
          this.jspInit.unmakeSource(node.id);
          this.jspInit.unmakeTarget(node.id);
        });
      }
    },
    initFlowCanvas() {
      let { nodes, links } = this.$store.state.flowData;
      this.jspInit.ready(() => {
        this.jspInit.deleteEveryEndpoint();
        this.jspInit.deleteEveryConnection();
        this.jspInit.unmakeEverySource();
        this.jspInit.unmakeEveryTarget();
        this.jspInit.unbind("click");
        this.jspInit.unbind("contextmenu");
        this.jspInit.unbind("connection");

        this.nodes = nodes;
        this.$nextTick(() => {
          links.forEach((link, index) => {
            let jsPConnect = this.jspInit.connect(
              {
                source: link.sourceId,
                target: link.targetId,
              },
              {
                isSource: jsPlumbConfig.isSource, // 是否可以拖动（作为连线起点）
                isTarget: jsPlumbConfig.isTarget, // 是否可以放置（连线终点）
                //连线的样式
                paintStyle: jsPlumbConfig.connectorStyle, //连线的样式
                hoverPaintStyle: jsPlumbConfig.connectorHoverStyle,

                //  锚点
                endpoint: jsPlumbConfig.endpoints,
                endpointStyle: jsPlumbConfig.paintStyle,
                endpointHoverStyle: jsPlumbConfig.hoverPaintStyle,

                connector: link.connector ? link.connector : jsPlumbConfig.connector,
                anchor: flowAnchor,
                overlays: jsPlumbConfig.connectorOverlays,
              }
            );
            if (link.label) {
              jsPConnect.setLabel({
                label: link.label,
                cssClass: "link-label",
                // events: {
                //   click: (labelOverlay, originalEvent) => {
                //     console.log("点击了label");
                //   },
                // },
              });
            }
            this.initConnection(jsPConnect, link);
          });
        });

        this.jspInit.bind("connection", (conn, e) => {
          let connection = this.jspInit.getConnections({
            source: conn.sourceId,
            target: conn.targetId,
          })[0];
          this.initConnection(connection, conn);
          this.addConnection(conn);
        });
        // jsPlumb.bind("beforeDrop", function (conn, e) {
        //   console.log("sdsddsf");
        //   return true;
        //   //   // let sourceId = info.sourceId;
        //   //   // let targetId = info.targetId;
        //   //   // if (sourceId == targetId) return false;
        //   //   // let filter = that.flowData.linkList.filter(
        //   //   //   (link) => link.sourceId == sourceId && link.targetId == targetId
        //   //   // );
        // });

        //  连线右击事件操作
        this.jspInit.bind("contextmenu", (conn, originalEvent) => {
          this.$emit("context-menu", {
            type: "link",
            event: originalEvent,
            data: conn,
          });
          originalEvent.stopPropagation();
          originalEvent.preventDefault();
          return false;
        });
      });
    },

    handlerMouseup(e) {
      if (this.$store.state.newNode.state) {
        this.pasteNode(e);
      }
    },
    pasteNode(e) {
      this.nodes = this.addNewNode(e, this.$store.state.newNode.node);
      this.$nextTick(() => {
        this.toggleDraggable();
      });
    },

    // 添加节点
    addNewNode(e, node) {
      let newNode = this.$store.state.flowData.nodes;
      newNode.push(
        Object.assign(
          {
            name: node.name,
            type: node.type,
            icon: node.icon,

            id: getUUID(),
            x: e.offsetX - node.x,
            y: e.offsetY - node.y,
          },
          nodePrame
        )
      );
      this.$store.commit("setFlowData", { nodes: newNode });
      return newNode;
    },
    // 删除节点
    deleteNode(node) {
      this.$store.commit("setFlowData", { method: "delete-node", node });
      this.initFlowCanvas();
    },
    addConnection(conn) {
      let isExist = this.$store.state.flowData.links.findIndex((item) => {
        return item.sourceId === conn.sourceId && item.targetId === conn.targetId;
      });
      if (isExist < 0) {
        this.$store.commit("setFlowData", {
          method: "add-link",
          link: Object.assign(
            {
              id: getUUID(),
              connector: this.connector,
              sourceId: conn.sourceId,
              targetId: conn.targetId,
            },
            linkPrame
          ),
        });
      }
    },
    initConnection(jsPConnect, link) {
      jsPConnect.bind("click", (conn, originalEvent) => {
        let links = this.$store.state.flowData.links;
        this.$store.commit("setSelectContent", {
          type: "link",
          data: links.find((item) => {
            return item.sourceId === link.sourceId && item.targetId === link.targetId;
          }),
        });
        originalEvent.stopPropagation();
        originalEvent.preventDefault();
        return false;
      });
    },
    deleteConnection(conn) {
      let plumb = this.jspInit.deleteConnection(conn);
      if (plumb) {
        this.$store.commit("setFlowData", {
          method: "delete-link",
          link: { sourceId: conn.sourceId, targetId: conn.targetId },
        });
      }
    }
  },
};
</script>

<style scoped lang="scss">
.flow-area {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 10;
}
</style>
