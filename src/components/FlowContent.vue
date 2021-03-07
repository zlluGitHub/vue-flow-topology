<template>
  <main
    ref="main"
    @mousedown="mousedownHandler"
    @mouseup="mouseupHandler"
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
      <FlowArea ref="flowArea" @context-menu="handleMouseContextmenu" />
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
    <!-- 导入工作流 -->
    <input type="file" ref="inputFile" @change="handleExportFile" style="display: none" />
  </main>
</template>
<script>
import fileSaver from "file-saver";
import FlowArea from "./modules/FlowArea";
import RightMenu from "./modules/ContextMenu";
import { flowConfig } from "@/config/flow.config.js";
import { uploadFile, deepClone } from "@/utils";
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
      if (newVal.type === "upper-step") {
        // 上一步
        let flowStepData = this.$store.state.flowStepData;
        let stepIndex = this.$store.state.stepIndex;
        if (stepIndex > 0) {
          stepIndex = stepIndex - 1;
          this.$store.commit("setStepIndex", stepIndex);
          this.$store.commit("setFlowData", flowStepData[stepIndex]);
          this.$refs.flowArea.initFlowCanvas();
        }
      } else if (newVal.type === "next-step") {
        //下一步
        let flowStepData = this.$store.state.flowStepData;
        let stepIndex = this.$store.state.stepIndex;
        if (stepIndex < flowStepData.length - 1) {
          stepIndex = stepIndex + 1;
          this.$store.commit("setStepIndex", stepIndex);
          this.$store.commit("setFlowData", flowStepData[stepIndex]);
          this.$refs.flowArea.initFlowCanvas();
        }
      } else if (newVal.type === "connection" || newVal.type === "drag-drop") {
        this.$refs.flowArea.toggleDraggable(newVal);
      } else if (newVal.type === "enlarge") {
        // 放大
        this.scalePosition = {
          x: 3686,
          y: 3355,
        };
        this.setZoom("enlarge");
      } else if (newVal.type === "narrow") {
        // 缩小
        this.scalePosition = {
          x: 3686,
          y: 3355,
        };
        this.setZoom("narrow");
      } else if (newVal.type === "import") {
        this.$refs.inputFile.click();
        // inputFileDom.onchange = () => {
        //   uploadFile(this.$refs.inputFile, (content) => {
        //     this.$store.commit("setFlowData", JSON.parse(content));
        //     this.handleCreateClick();
        //   });
        // };
      } else if (newVal.type === "export") {
        let flowData = this.$store.state.flowData;
        let blob = new Blob([JSON.stringify(flowData)], {
          type: "text/plain;charset=utf-8",
        });
        fileSaver(blob, `${flowData.title}.flow`);
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
    handleExportFile() {
      uploadFile(this.$refs.inputFile, (content) => {
        this.$store.commit("setFlowData", JSON.parse(content));
        this.$refs.flowArea.initFlowCanvas();
      });
    },
    // 拖拽鼠标抬起事件（添加节点）
    onIsAddNode() {
      if (this.$store.state.newNode.state) {
        let time = setTimeout(() => {
          this.$refs.flowArea.handleNewNode("drag", this.mousePosition);
          clearTimeout(time);
        }, 25);
      }
    },
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
      this.$store.commit("setFlowData", flowConfig);
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
    handleMouseContextmenu({ event, type, data }) {
      this.event = event;
      this.rightMenuObj = {
        type,
        show: true,
        x: event.x,
        y: event.y,
      };
      if (type === "flow") {
        this.newNodePosition = { ...this.mousePosition };
      } else if (type === "node") {
        this.nodeData = data;
      } else if (type === "link") {
        this.linkData = data;
      }
    },
    // 右击菜单事件类型
    handleRightMenuClick({ type, event }) {
      if (type === "delete-node") {
        this.$refs.flowArea.deleteNode(this.nodeData);
      } else if (type === "save") {
        this.handleSave();
      } else if (type === "delete-link") {
        this.$refs.flowArea.deleteConnection(this.linkData);
      } else if (type === "copy") {
        this.$store.commit("setNewNode", {
          state: false,
          node: deepClone(this.nodeData),
        });
      } else if (type === "paste") {
        let time = setTimeout(() => {
          this.$refs.flowArea.handleNewNode("paste", this.newNodePosition);
          clearTimeout(time);
        }, 25);
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

      this.$store.commit("setSelectContent", {
        type: "",
        data: this.$store.state.flowData,
      });

      this.$emit("on-select-type", "drag-drop");
      this.$store.commit("setFlowMenuObj", { type: "drag-drop" });
      document.getElementsByClassName("item-node").forEach((ele) => {
        ele.classList.remove("active");
      });
    },

    // 鼠标抬起事件
    mouseupHandler(e) {
      let flowData = this.$store.state.flowData;
      if (
        flowData.offsetX !== this.dragMove.left &&
        flowData.offsetY !== this.dragMove.top
      ) {
        flowData.offsetX = this.dragMove.left;
        flowData.offsetY = this.dragMove.top;
        this.$store.commit("setFlowData", flowData);
        this.$store.commit("setFlowStepData", flowData);
      }
      this.dragMove = { ...this.dragMove, ...{ isDown: false } };
    },
    // 鼠标移动事件
    mousemoveHandler(e) {
      let event = window.event || e;
      let offsetX = event.layerX ? event.layerX : event.offsetX;
      let offsetY = event.layerY ? event.layerY : event.offsetY;
      this.mousePosition = { x: offsetX, y: offsetY };
      let { downPosition, originalPosition, isDown } = this.dragMove;
      if (isDown) {
        let top = originalPosition.top + (event.y - downPosition.y);
        let left = originalPosition.left + (event.x - downPosition.x);
        this.dragMove.top = top;
        this.dragMove.left = left;
      }
    },
  },
  beforeDestroy() {
    this.$store.commit("setFlowStepData");
    this.$Message.destroy();
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
