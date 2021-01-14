<template>
  <div class="flow-area">
    <FlowNode
      v-for="(item, i) in nodes"
      :key="'node' + i"
      :id="item.id"
      @click.native="handleNodeClik"
      shape="square"
      :style="{ top: item.y + 'px', left: item.x + 'px' }"
    >
      <p>{{ item.name }}</p>
    </FlowNode>
  </div>
</template>

<script>
import FlowNode from "./FlowNode";
import jsplumb from "jsplumb";
import { jsPlumbConfig, flowData } from "@/config/flow.config.js";
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
    jsPlumb.ready(() => {
      // let plumb = jsPlumb.getInstance();
      // jsPlumb.setContainer('diagramContainer')
      // jsPlumb.importDefaults({
      //   ConnectionsDetachable: jsPlumbConfig.isDetachable,
      // });
      this.loadFlowData(flowData);
      // 连线初始化
      // let anchors = ["Top", "Right", "Bottom", "Left"]; // "AutoDefault","Top" ,"Right", "Bottom", "Left","TopRight", "TopLeft","BottomRight","BottomLeft", "Center"
      // jsPlumb.addEndpoint("jsPlumb_1", { anchors }, jsPlumbConfig);
      // jsPlumb.addEndpoint("jsPlumb_1", { anchors }, jsPlumbConfig);
      // jsPlumb.addEndpoint("jsPlumb_1", { anchors }, jsPlumbConfig);
      // jsPlumb.addEndpoint("jsPlumb_1", { anchors }, jsPlumbConfig);
      // jsPlumb.addEndpoint("jsPlumb_2", { anchors }, jsPlumbConfig);
      // jsPlumb.addEndpoint("jsPlumb_3", { anchors }, jsPlumbConfig);

      // // 节点拖动
      // jsPlumb.draggable("jsPlumb_1"); //初始化
      // jsPlumb.draggable("jsPlumb_2");
      // jsPlumb.draggable("jsPlumb_3");

      // // 连线击事件操作
      // jsPlumb.bind("click", function (conn, originalEvent) {
      //   console.log("删除连线", conn);
      //   // jsPlumb.detach(conn);
      //   // 删除连线
      //   jsPlumb.deleteConnection(conn);
      //   // 删除节点
      //   // jsPlumb.remove("jsPlumb_1")
      //   //获取所有连线
      //   // jsPlumb.getAllConnections()
      // });

      // // 鼠标连线事件操作
      // jsPlumb.bind("connection", function (conn, originalEvent) {
      //   console.log("连线已完成", conn);
      // });
      // // jsPlumb.bind("beforeDrop", function (conn, originalEvent) {
      // //   console.log("beforeDrop连线已完成", conn);
      // // });
      // console.log(jsPlumb);

      //添加节点为选中
jsplumb.addToDragSelection(obj);
//删除单个节点选中
jsplumb.removeFromDragSelection(obj);
//删除所有节点选中
jsplumb.clearDragSelection();

jsplumb.unmakeSource(id)
jsplumb.unmakeTarget(id)
    });
  },
  methods: {
    // https://zhuanlan.zhihu.com/p/43642654
    handleNodeClik() {
      jsPlumb.batch(() => {
        // this.initAll();
        // this.connectionAll();
      });
      console.log("jsPlumb");
    },
    handleOnSelect(node) {
      console.log("删除所有连线");
      jsPlumb.removeAllEndpoints(node); //这个方法删除指定的节点和连线，传入的node为节点元素
      jsPlumb.deleteEveryConnection(); //这个方法删除所有连线，不需要传入参数
      jsPlumb.deleteEveryEndpoint(); //这个方法删除所有节点，不需要传入参数
      this.jsp.deleteConnectionsForElement("A-1", {}); //删除制定的连线，传入节点ID

      //重绘连线
      this.jsp.repaintEverything();
      this.jsp.setSuspendDrawing(true);
      this.jsp.setSuspendDrawing(false, true);
      //这里第二个参数的true，会使整个jsPlumb立即重绘。

      //如果大于1条，则不在进行连接
		if(conns.length>1){
			 jsPlumb.detach(conn);
		}

    },

    // 清空画布
    clear() {
      const that = this;
      this.flowData.nodeList.forEach(function (node, index) {
        jsPlumb.remove(node.id);
      });
      this.currentSelect = {};
      this.currentSelectGroup = [];
      this.flowData.nodeList = [];
      this.flowData.linkList = [];
      this.flowData.remarks = [];
    },
    // 初始化flow数据
    loadFlowData(data) {
      this.nodes = data.nodes;
      console.log(data);
        jsPlumb.batch(() => {
          console.log('batch');
        })
      data.nodes.forEach((node) => {
        this.$nextTick(() => {
          jsPlumb.addEndpoint(
            node.id,
            {
              anchors: jsPlumbConfig.anchors,
            },
            jsPlumbConfig
          );
          jsPlumb.draggable(node.id);
        });
      });

      let links = data.links;

      links.forEach((link, index) => {
        this.$nextTick(() => {
          jsPlumb.connect({
            source: link.sourceId,
            target: link.targetId,
            //连线的样式
            paintStyle: jsPlumbConfig.connectorStyle, //连线的样式
            hoverPaintStyle: jsPlumbConfig.connectorHoverStyle,

            //  锚点
            endpoint: jsPlumbConfig.endpoints,
            endpointStyle: jsPlumbConfig.paintStyle,
            endpointHoverStyle: jsPlumbConfig.hoverPaintStyle,

            connector: jsPlumbConfig.connector,
            anchor: jsPlumbConfig.anchor,
            overlays: jsPlumbConfig.connectorOverlays,
          });

          // if (link.label != "") {
          //   conn.setLabel({
          //     label: link.label,
          //     cssClass: "linkLabel",
          //   });
          // }
        });
      });

      //

      // that.currentSelect = {};
      // that.currentSelectGroup = [];
      // that.flowData.status = flowConfig.flowStatus.MODIFY;
      //
      // let canvasSize = that.computeCanvasSize();
      // that.$refs.flowArea.container.pos = {
      //   top: -canvasSize.minY + 100,
      //   left: -canvasSize.minX + 100,
      // };
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
