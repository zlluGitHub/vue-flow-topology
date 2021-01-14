<template>
  <main
    @mousedown="mousedownHandler"
    @mouseup="mouseupHandler"
    @mousemove="mousemoveHandler"
  >
    <div class="view-scale">缩放倍数：{{ viewScale }}%</div>
    <div class="reset" @click="handleResetCanvas">重置</div>
    <div
      :class="['flow-content', 'grid', dragMove.isDown ? 'flow-grab' : null]"
      @mousewheel="mousewheelHandler"
      :style="{
        transform: `scale(${viewScale})`,
        transformOrigin: `${scalePosition.x}px ${scalePosition.y}px`,
        left: dragMove.left + 'px',
        top: dragMove.top + 'px',
      }"
    >
      <FlowArea ref="flowArea" />
    </div>
    <div class="mouse-position">x: {{ mousePosition.x }}, y: {{ mousePosition.y }}</div>
  </main>
</template>
<script>
import FlowArea from "./modules/FlowArea";
import jsplumb from "jsplumb";
import { flowData, flowData1 } from "@/config/flow.config.js";
export default {
  name: "FlowContent",
  components: { FlowArea },

  data() {
    return {
      viewScale: 1,
      scalePosition: {
        x: 0,
        y: 0,
      },
      dragMove: {
        top: -3000,
        left: -3000,
      },
      mousePosition: {
        x: 0,
        y: 0,
      },
    };
  },
  // props: {
  //   msg: String,
  // },
  computed: {
    flowMenuObj() {
      return this.$store.state.flowMenuObj;
    },
  },
  watch: {
    flowMenuObj(newVal, oldVal) {
      if (newVal.type === "connection" || newVal.type === "drag-drop") {
        this.$refs.flowArea.toggleDraggable(newVal.type);
      }
    },
  },
  mounted() {
    console.log(jsPlumb);
    let { offsetX, offsetY } = this.$store.state.flowData;
    if (offsetX && offsetY) {
      this.dragMove = {
        top: offsetX,
        left: offsetY,
      };
    }

    // this.$refs.flowArea.initFlowCanvas(flowData, newVal);
  },
  methods: {
    handleResetCanvas() {
      // jsPlumb.clear();
      // jsPlumb.unmakeEverySource();
      // jsPlumb.unmakeEveryTarget();

      // jsPlumb.destroy();
      // flowData.nodes.push({
      //   type: "start",
      //   name: "开始5",
      //   id: "asfass1",
      //   icon: "pause-circle",
      //   height: 0,
      //   width: 0,
      //   x: 3600,
      //   y: 3600,
      // });
      // flowData.nodes.forEach((node) => {
      //   jsplumb.unmakeSource(node.id);
      //   jsplumb.unmakeTarget(node.id);
      // });

      this.$refs.flowArea.initFlowCanvas(flowData1);
    },
    addNode(obj) {
      // jsPlumb.clear();
      flowData.nodes.push(obj);
      this.$refs.flowArea.initFlowCanvas(flowData);
    },
    // 滚轮滚动事件
    mousewheelHandler(e) {
      let event = window.event || e;
      // console.log(event);

      if (event.wheelDelta) {
        //判断浏览器IE，谷歌滑轮事件
        if (event.wheelDelta > 0) {
          //当滑轮向上滚动时
          this.setZoom("enlarge");
        }
        if (event.wheelDelta < 0) {
          //当滑轮向下滚动时
          this.setZoom("narrow");
        }
      } else if (event.detail) {
        //Firefox滑轮事件
        if (event.detail > 0) {
          //当滑轮向下滚动时
          this.setZoom("narrow");
        }
        if (event.detail < 0) {
          //当滑轮向上滚动时
          this.setZoom("enlarge");
        }
      }
      this.scalePosition = {
        x: event.layerX ? event.layerX : event.offsetX,
        y: event.layerY ? event.layerY : event.offsetY,
      };
    },
    setZoom(mark) {
      let viewScale = this.viewScale;
      if (mark === "enlarge") {
        viewScale = viewScale > 1.5 ? viewScale : viewScale + 0.05;
      } else if (mark === "narrow") {
        viewScale = viewScale < 0.5 ? viewScale : viewScale - 0.05;
      }
      // jsPlumb.setZoom(viewScale);
      this.viewScale = viewScale;
    },
    // 鼠标按下事件
    mousedownHandler(e) {
      let event = window.event || e;
      this.dragMove.isDown = true;
      this.dragMove.originalPosition = { ...this.dragMove };
      this.dragMove.downPosition = {
        y: event.y,
        x: event.x,
      };
    },
    // 鼠标抬起事件
    mouseupHandler(e) {
      //  console.log('鼠标抬起');
      this.dragMove.isDown = false;
      // this.handleResetCanvas();
    },
    // 鼠标移动事件
    mousemoveHandler(e) {
      // console.log(e);
      let event = window.event || e;
      let offsetX = event.layerX ? event.layerX : event.offsetX;
      let offsetY = event.layerY ? event.layerY : event.offsetY;
      this.mousePosition = { x: offsetX, y: offsetY };
      let { downPosition, originalPosition, isDown, top, left } = this.dragMove;
      if (isDown) {
        let top = originalPosition.top + (event.y - downPosition.y);
        let left = originalPosition.left + (event.x - downPosition.x);
        this.dragMove.top = top;
        this.dragMove.left = left;
        this.$store.commit("setFlowData", { offsetX: left, offsetY: top });
        // this.$store.commit("setFlowData", { method: "add", node });
      }
    },
    // initJsPlumb() {
    //   // that.plumb = jsPlumb.getInstance(flowConfig.jsPlumbInsConfig);
    //   jsPlumb.connect({
    //     source: "jsPlumb_1",
    //     target: "jsPlumb_2",
    //     endpoint: "Rectangle",
    //     connector: ["Bezier"],
    //     anchor: ["Left", "Right"],
    //   });

    //   jsPlumb.draggable("jsPlumb_1");
    //   jsPlumb.draggable("jsPlumb_2");
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  //  z-index: 0;
  .grid {
    &::before {
      content: "";
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 0;
      background-image: linear-gradient(90deg, #ebebeb75 1px, transparent 0),
        linear-gradient(#ebebeb75 1px, transparent 0);
      background-size: 12px 12px;
    }
  }
  .flow-content {
    position: absolute;
    transform: scale(1);
    transform-origin: 0px 0px;
    width: 1000%;
    height: 1000%;
     z-index: 1;
    // background: #eee;
    cursor: move;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }
  .flow-grab {
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
  .view-scale {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .reset {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
  .mouse-position {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
