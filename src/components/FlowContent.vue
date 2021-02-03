<template>
  <main
    ref="main"
    @mousedown="mousedownHandler"
    @mouseup="mouseupHandler"
    @click.stop="handleFlowClick"
    @mousemove="mousemoveHandler"
    @contextmenu.prevent.stop="handleMouseContextmenu({ type: 'flow', event: $event })"
  >
    <div class="view-scale">缩放：{{ parseInt(viewScale * 100) }}%</div>
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
      <FlowArea ref="flowArea" @context-menu="handleMouseContextmenu($event)" />
    </div>
    <div class="mouse-position">x: {{ mousePosition.x }}, y: {{ mousePosition.y }}</div>
    <div class="footer"><span>by.zll @ 2021-1-6</span></div>
    <!-- 右击菜单 -->
    <template v-if="rightMenuObj.show">
      <RightMenu
        @on-click="handleRightMenuClick"
        :style="{ top: `${rightMenuObj.y}px`, left: `${rightMenuObj.x}px` }"
        :type="rightMenuObj.type"
      />
      <div class="mask" @click.stop="handleCloseMenu"></div>
    </template>
  </main>
</template>
<script>
import FlowArea from "./modules/FlowArea";
import RightMenu from "./modules/ContextMenu";
import { flowConfig } from "../config/flow.config.js";
export default {
  name: "FlowContent",
  components: { FlowArea, RightMenu },

  data() {
    return {
      viewScale: 1,
      scalePosition: {
        x: 0,
        y: 0,
      },
      dragMove: flowConfig,
      mousePosition: {
        x: 0,
        y: 0,
      },
      rightMenuObj: {
        show: false,
        x: 0,
        y: 0,
      },
      nodeData: {},
      linkData: {},
      event: {},
    };
  },
  computed: {
    flowMenuObj() {
      return this.$store.state.flowMenuObj;
    },
  },
  watch: {
    flowMenuObj(newVal, oldVal) {
      if (newVal.type === "connection" || newVal.type === "drag-drop") {
        this.$refs.flowArea.toggleDraggable(newVal);
      } else if (newVal.type === "enlarge") {
        this.scalePosition = {
          x: 3686,
          y: 3355,
        };
        this.setZoom("enlarge");
      } else if (newVal.type === "narrow") {
        this.scalePosition = {
          x: 3686,
          y: 3355,
        };
        this.setZoom("narrow");
      } else if (newVal.type === "restore") {
        let { offsetX, offsetY } = flowConfig;
        this.dragMove = {
          top: offsetY,
          left: offsetX,
        };
        this.$store.commit("setFlowData", { offsetX, offsetY });
      } else if (newVal.type === "reset") {
        //重置
        // let { offsetX, offsetY } = flowConfig;
        // this.dragMove = {
        //   top: offsetY,
        //   left: offsetX,
        // };
        // this.$store.commit("setFlowData", flowConfig);
      } else if (newVal.type === "save") {
        this.handleSave();
      } else if (newVal.type === "clear") {
        //清空
        this.handleClear();
      }
    },
  },
  mounted() {
    let { offsetX, offsetY } = this.$store.state.flowData;
    if (offsetX && offsetY) {
      this.dragMove = {
        top: offsetY,
        left: offsetX,
      };
    }
    this.$refs.flowArea.initFlowCanvas();
  },
  methods: {
    // 保存画布内容
    handleSave() {
      let flowData = JSON.stringify(this.$store.state.flowData);
      console.log(flowData);
      this.$Modal.success({
        title: "操作提示",
        content: "保存成功，请在控制台中查看！",
      });
    },
    // 清空画布内容
    handleClear() {
      let { offsetX, offsetY } = flowConfig;
      this.dragMove = {
        top: offsetY,
        left: offsetX,
      };
      this.$store.commit("setFlowData", JSON.parse(JSON.stringify(flowConfig)));
      this.$refs.flowArea.initFlowCanvas();
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
    // 鼠标点击关闭右击菜单
    handleCloseMenu() {
      this.rightMenuObj = { show: false };
    },
    // 鼠标右击事件
    handleMouseContextmenu(content) {
      let { event, type, data } = content;
      this.event = event;
      this.rightMenuObj = {
        type,
        show: true,
        x: event.x,
        y: event.y,
      };
      if (type === "flow") {
      } else if (type === "node") {
        this.nodeData = data;
      } else if (type === "link") {
        this.linkData = data;
      }
    },
    // 右击菜单事件类型
    handleRightMenuClick(data) {
      let { type } = data;
      if (type === "delete-node") {
        this.$refs.flowArea.deleteNode(this.nodeData);
      } else if (type === "save") {
        this.handleSave();
      } else if (type === "delete-link") {
        this.$refs.flowArea.deleteConnection(this.linkData);
      } else if (type === "copy") {
        let { name, type, icon } = this.nodeData;
        this.$store.commit("setNewNode", {
          state: false,
          node: { name, type, icon, x: 0, y: 0 },
        });
      } else if (type === "paste") {
        this.$refs.flowArea.pasteNode(this.event);
      }
      this.handleCloseMenu();
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
    // 鼠标点击事件
    handleFlowClick() {
      this.$store.commit("setSelectContent", {
        type: "",
        data: this.$store.state.flowData,
      });
    },
    // 鼠标抬起事件
    mouseupHandler(e) {
      this.dragMove.isDown = false;
      // this.handleResetCanvas();
    },
    // 鼠标移动事件
    mousemoveHandler(e) {
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
      }
    },
  },
};
</script>
<style scoped lang="scss">
main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
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
    top: 10px;
    right: 10px;
    z-index: 1;
    font-size: 12px;
  }
  .footer {
    position: absolute;
    bottom: 10px;
    left: 20px;
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
    bottom: 10px;
    right: 10px;
    z-index: 1;
  }
  // 遮罩层
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
  }
}
</style>
