<template>
  <div :class="['node-item']">
    <slot></slot>
    <!-- <div class="paint-box">
      <div class="paint" :id="'io' + paintId">a</div>
    </div> -->
  </div>
</template>

<script>
import jsplumb from "jsplumb";
export default {
  name: "FlowNode",
  data() {
    return {
      // isSelect: false,
    };
  },

  props: ["node"],
  mounted() {
    this.$nextTick(() => {
      jsPlumb.draggable(this.node.id, {
        containment: "parent",
        handle: () => {
          console.log("handle");
          return true;
        },
        // grid: true,
        drag: (e) => {
          console.log("sds1");
          // if (flowConfig.defaultStyle.isOpenAuxiliaryLine) {
          //   that.$emit("alignForLine", e);
          // }
        },
        stop: (e) => {
          console.log("sds2");
          // that.node.x = e.pos[0];
          // that.node.y = e.pos[1];
          // that.$emit("hideAlignLine");
        },
      });
    });
  },
  methods: {
    // mousedownHandler(ev) {
    //   document.querySelectorAll(".node-item").forEach((ele) => {
    //     ele.classList.remove("active");
    //   });
    //   let node = this.$refs.nodeItem;
    //   node.classList.add("active");
    //   let oevent = ev || event;
    //   let distanceX = oevent.clientX - node.offsetLeft;
    //   let distanceY = oevent.clientY - node.offsetTop;
    //   //设置样式
    //   node.style.cursor = "move";
    //   document.onmousemove = (ev) => {
    //     let oevent = ev || event;
    //     node.style.left = oevent.clientX - distanceX + "px";
    //     node.style.top = oevent.clientY - distanceY + "px";
    //   };
    //   document.onmouseup = () => {
    //     document.onmousemove = null;
    //     document.onmouseup = null;
    //     node.style.cursor = null;
    //   };
    // },
  },
};
</script>

<style scoped lang="scss">
.circular {
  border-radius: 100%;
}

.node-item {
  padding: 20px;
  position: absolute;
  border: 2px solid transparent;
  background: rgb(239, 154, 154);
  z-index: 10px;
  .paint-box {
    position: relative;
    z-index: 2;
    .paint {
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 2;
      transform: translate(-50%, -50%);
      background: coral;
    }
  }

  .active {
    border: 2px dashed #409eff;
    // outline: 1px dashed #409eff;
    // outline-offset: 0;
  }
}
</style>
