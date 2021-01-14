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
    console.log("node");
    this.$nextTick(() => {
      jsPlumb.draggable(this.node.id);
    });
  },
  methods: {},
  beforeDestroy() {
    // jsPlumb.deleteEveryEndpoint();
    // jsPlumb.deleteEveryConnection();
    // jsPlumb.unmakeEverySource();
    // jsPlumb.unmakeEveryTarget();
    // jsPlumb.remove(this.node.id);
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
