<template>
  <div id="flow-area" class="flow-area" ref="flowArea" @mouseup="handlerMouseup">
    <flow-node
      v-for="(item, i) in nodes"
      :key="'node' + i"
      :id="item.id"
      :paintId="item.id"
      @click.native="handleNodeClik"
      shape="square"
      :style="{ top: item.y + 'px', left: item.x + 'px' }"
    >
      <p>{{ item.name }}</p>
    </flow-node>
  </div>
</template>

<script>
import FlowNode from "./FlowNode";
import jsPlumb from "jsplumb";
import { jsPlumbConfig, flowAnchors, flowData } from "@/config/flow.config.js";
export default {
  name: "FlowArea",
  components: { FlowNode },
  data() {
    return {
      nodes: [],
    };
  },
  props: {
    msg: String,
  },
  mounted() {
    // jsPlumb.ready(() => {
    //   this.loadFlowData(flowData);
    // });
  },
  methods: {
    handlerMouseup() {
      console.log("handlerMouseup");
    },
    handleNodeClik() {
      // jsPlumb.batch(() => {
      //   // this.initAll();
      //   // this.connectionAll();
      // });
      console.log("jsPlumb");
    },
    initFlowCanvas(data) {
      // jsPlumb.unmakeEverySource();
      // jsPlumb.unmakeEveryTarget();

      // if (jsPlumb) {
      //   jsPlumb.deleteEveryEndpoint();
      //   jsPlumb.deleteEveryConnection();
      //   // jsPlumb.clear();
      //   // jsPlumb.destroy();
      // }
      // jsPlumb = plumb.getInstance();
      // jsPlumb = plumb;

      // jsPlumb.getAllConnections();
      jsPlumb.ready(() => {
        // this.nodes.forEach((node, index) => {
        //   this.$nextTick(() => {
        //     jsPlumb.remove(node.id);
        //   });
        // });
          jsPlumb.deleteEveryEndpoint();
        jsPlumb.deleteEveryConnection();
        jsPlumb.batch(() => {
          this.loadFlowData(data ? data : { links: [], nodes: [] });
        });
      });
    },

    // 初始化flow数据
    loadFlowData(data) {
      // this.$refs.flowArea.remove();
      // data = data ? data : flowData;

      this.nodes = data.nodes;
      // console.log(data);

      // jsPlumb.importDefaults({
      //   ConnectionsDetachable: true,
      // });

      // jsPlumb.batch(() => {
      //   console.log("batch");
      // });
      // console.log(data);
      let links = data.links;
      data.nodes.forEach((node) => {
        this.$nextTick(() => {
          //
          // console.log(node.id);
          // jsPlumb.makeSource(node.id, jsPlumbConfig);

          // jsPlumb.makeTarget(node.id, jsPlumbConfig);
          console.log(jsPlumb.draggable(node.id));
          // ;
        });
      });

      links.forEach((link, index) => {
        this.$nextTick(() => {
          jsPlumb.connect(
            {
              source: link.sourceId,
              target: link.targetId,
            },
            {
              // uuids: ["point-" + link.sourceId, "point-" + link.targetId],
              isSource: true, // 是否可以拖动（作为连线起点）
              isTarget: true, // 是否可以放置（连线终点）
              //连线的样式
              paintStyle: jsPlumbConfig.connectorStyle, //连线的样式
              hoverPaintStyle: jsPlumbConfig.connectorHoverStyle,

              //  锚点
              endpoint: jsPlumbConfig.endpoints,
              endpointStyle: jsPlumbConfig.paintStyle,
              endpointHoverStyle: jsPlumbConfig.hoverPaintStyle,

              connector: jsPlumbConfig.connector,
              anchor: flowAnchors,
              overlays: jsPlumbConfig.connectorOverlays,
            }
          );

          // if (link.label != "") {
          //   conn.setLabel({
          //     label: link.label,
          //     cssClass: "linkLabel",
          //   });
          // }
        });
      });

      // 连线击事件操作
      jsPlumb.bind("click", function (conn, originalEvent) {
        console.log("删除连线", conn);
        // 删除连线
        jsPlumb.deleteConnection(conn);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.flow-area {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
