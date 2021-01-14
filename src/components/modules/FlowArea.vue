<template>
  <div class="flow-area" id="we" ref="flowArea" @mouseup="handlerMouseup">
    <flow-node
      v-for="(node, i) in nodes"
      :key="'node' + i"
      :id="node.id"
      :node="node"
      :style="{ top: node.y + 'px', left: node.x + 'px', cursor }"
    >
      <p @mousedown="handlerNodeClick($event, node)">{{ node.name }}</p>
    </flow-node>
  </div>
</template>

<script>
import FlowNode from "./FlowNode";
import jsplumb from "jsplumb";
import {
  jsPlumbConfig,
  flowAnchors,
  flowAnchor,
  flowData,
} from "@/config/flow.config.js";
import { getUUID } from "@/utils";
export default {
  name: "FlowArea",
  components: { FlowNode },
  data() {
    return {
      nodes: [],
      cursor: "move",
    };
  },
  props: {
    msg: String,
  },
  mounted() {
    this.initFlowCanvas();
  },
  methods: {
    toggleDraggable(type) {
      if (type === "connection") {
        this.cursor = "crosshair";
        this.nodes.forEach(function (node, index) {
          // if ( ) {

          // }
          // console.log(jsPlumb.isAlreadyDraggable(node.id));
          let f = jsPlumb.toggleDraggable(node.id);
          if (f) {
            jsPlumb.toggleDraggable(node.id);
          }
          let config = { ...jsPlumbConfig, ...{ anchor: flowAnchor } };
          jsPlumb.makeSource(node.id, config);
          jsPlumb.makeTarget(node.id, config);
        });
      } else {
        this.cursor = "move";
        this.nodes.forEach(function (node, index) {
          // console.log(jsPlumb.isAlreadyDraggable(node.id));
          let f = jsPlumb.toggleDraggable(node.id);
          if (!f) {
            jsPlumb.toggleDraggable(node.id);
          }
          jsPlumb.unmakeSource(node.id);
          jsPlumb.unmakeTarget(node.id);
        });
      }
    },
    handlerMouseup(e) {
      console.log(e);
      if (this.$store.state.newNode.state) {
        this.nodes = this.addNewNode(e, this.$store.state.newNode.node);
        this.$nextTick(() => {
          this.toggleDraggable();
        });
      }
    },
    clear() {
      const that = this;
      this.nodes.forEach(function (node, index) {
        jsPlumb.remove(node.id);
      });
    },
    initFlowCanvas() {
      let { nodes, links } = this.$store.state.flowData;
      // console.log(links, "qqqqqqqqqqqq");
      // console.log(nodes, "wwwwwwwwww");
      jsPlumb.ready(() => {
        jsPlumb.deleteEveryEndpoint();
        // jsPlumb.deleteEveryConnection();
        // jsPlumb.unmakeEverySource();
        // jsPlumb.unmakeEveryTarget();
        jsPlumb.batch(() => {
          this.nodes = nodes;
          links.forEach((link, index) => {
            this.$nextTick(() => {
              let conn = jsPlumb.connect(
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

                  connector: jsPlumbConfig.connector,
                  anchor: flowAnchor,
                  overlays: jsPlumbConfig.connectorOverlays,
                }
              );
              if (link.label) {
                conn.setLabel({
                  label: link.label,
                  cssClass: "link-label",
                  events: {
                    click: (labelOverlay, originalEvent) => {
                      console.log("点击了label");
                    },
                  },
                });
              }
            });
          });

          jsPlumb.bind("connection", (conn, e) => {
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
          // 连线击事件操作
          jsPlumb.bind("click", (conn, originalEvent) => {
            this.deleteConnection(conn);
          });
        });
      });
    },
    addNewNode(e, node) {
      // let { nodes, links } = this.$store.state.flowData;
      let newNode = [...this.$store.state.flowData.nodes];
      console.log(newNode);
      newNode.push({
        ...node,
        ...{
          id: getUUID(),
          x: e.offsetX,
          y: e.offsetY,
        },
      });
      this.$store.commit("setFlowData", { nodes: newNode });
      return newNode;
    },
    handlerNodeClick(e, node) {
      if (3 == e.which) {
        // alert("这 是左键单击事件");
        // let plumb = jsPlumb.remove(node.id);
        // if (plumb) {
        this.$store.commit("setFlowData", { method: "delete-node", node });
        // let { nodes, links } = this.$store.state.flowData;
        // console.log(links);
        // console.log(nodes);
        // console.log(this.$store.state.flowData.links);
        this.initFlowCanvas();
        // this.nodes.forEach((node) => {
        //   jsPlumb.remove(node.id);
        // });
        // jsPlumb.batch(() => {
        //   this.initFlowCanvas(this.$store.state.flowData);
        // });
        // this.nodes = this.nodes.filter((item) => {
        //   return item.id !== node.id
        // });
        // this.nodes = this.$store.state.flowData.nodes;
        // console.log(this.nodes);
        // console.log(this.nodes,'```````````');
        // }
      }
    },
    addConnection(conn) {
      let isExist = this.$store.state.flowData.links.findIndex((item) => {
        return item.sourceId === conn.sourceId && item.targetId === conn.targetId;
      });
      if (isExist < 0) {
        console.log(conn);
        this.$store.commit("setFlowData", {
          method: "add-link",
          link: { id: getUUID(), sourceId: conn.sourceId, targetId: conn.targetId },
        });
      }
    },
    deleteConnection(conn) {
      let plumb = jsPlumb.deleteConnection(conn);
      if (plumb) {
        this.$store.commit("setFlowData", {
          method: "delete-link",
          link: { sourceId: conn.sourceId, targetId: conn.targetId },
        });
      }
    },
    // getAllConnections
    // nodeNameChange(e) {
    //   this.currentSelect.nodeName = e.target.value;
    // },
    // linkLabelChange(e) {
    //   let label = e.target.value;

    //   that.currentSelect.label = label;
    //   let conn = that.plumb.getConnections({
    //     source: that.currentSelect.sourceId,
    //     target: that.currentSelect.targetId,
    //   })[0];
    //   if (label != "") {
    //     conn.setLabel({
    //       label: label,
    //       cssClass: "linkLabel",
    //     });
    //   } else {
    //     let labelOverlay = conn.getLabelOverlay();
    //     if (labelOverlay) conn.removeOverlay(labelOverlay.id);
    //   }
    // },
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
