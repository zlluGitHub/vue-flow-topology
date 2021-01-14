<template>
  <main>
    <div class="view-scale">缩放倍数：{{ viewScale }}%</div>
    <div
      class="flow-content"
      ref="flowContent"
      @mousemove="mousemoveHandler"
      @mousewheel="mousewheelHandler"
      :style="{
        transform: `scale(${viewScale})`,
        transformOrigin: `${scalePosition.x}px ${scalePosition.y}px`,
      }"
    >
      <FlowArea />
    </div>
    <div class="mouse-position">x: {{ mousePosition.x }}, y: {{ mousePosition.y }}</div>
  </main>
</template>

<script>
import FlowArea from "./modules/FlowArea";

export default {
  name: "FlowContent",
  components: { FlowArea },
  props: {
    msg: String,
  },
  data() {
    return {
      viewScale: 1,
      scalePosition: {
        x: 0,
        y: 0,
      },
      mousePosition: {
        x: 0,
        y: 0,
      },
    };
  },
  mounted() {},
  methods: {
    // 滚轮滚动事件
    mousewheelHandler(e) {
      let event = window.event || e;
      this.scalePosition = {
        x: event.offsetX,
        y: event.offsetY,
      };

      if (event.wheelDelta) {
        //判断浏览器IE，谷歌滑轮事件
        if (event.wheelDelta > 0) {
          //当滑轮向上滚动时
          this.scaleCompute("add");
        }
        if (event.wheelDelta < 0) {
          //当滑轮向下滚动时
          this.viewScale = this.viewScale - 0.08;
        }
      } else if (event.detail) {
        //Firefox滑轮事件
        if (event.detail > 0) {
          //当滑轮向下滚动时
          this.viewScale = this.viewScale - 0.08;
        }
        if (event.detail < 0) {
          //当滑轮向上滚动时
          this.scaleCompute("add");
        }
      }

      // console.log(e);
    },
    scaleCompute(mark) {
      if (mark === "add") {
        this.viewScale = this.viewScale + 0.08;
      } else {
        this.viewScale = this.viewScale - 0.08;
      }
    },
    // 鼠标移动事件
    mousemoveHandler(e) {
      let event = window.event || e;
      this.mousePosition = {
        x: event.offsetX,
        y: event.offsetY,
      };
      // if (event.target.id == "flowContainer") {
      // } else {
      //   let cn = event.target.className;
      //   let tn = event.target.tagName;
      //   if (
      //     cn != "lane-text" &&
      //     cn != "lane-text-div" &&
      //     tn != "svg" &&
      //     tn != "path" &&
      //     tn != "I"
      //   ) {
      //     this.mouse.position.x = event.target.offsetLeft + event.offsetX;
      //     this.mouse.position.y = event.target.offsetTop + event.offsetY;
      //   }
      // }
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
  .flow-content {
    position: absolute;
    top: -3000px;
    left: -3000px;
    transform: scale(1);
    transform-origin: 0px 0px;
    width: 1000%;
    height: 1000%;
    background: #eee;
  }
  .view-scale {
    position: absolute;
    top: 0;
    left: 0;
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
