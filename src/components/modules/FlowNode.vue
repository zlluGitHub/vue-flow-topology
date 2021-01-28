<template>
  <div
    class="node-warp"
    @contextmenu.prevent.stop="$emit('context-menu', $event)"
    @click.stop="handleSelectNode(node)"
  >
    <div v-if="node.type === 'start-node'" class="item-node menu-start-node">
      {{ node.name }}
    </div>
    <div v-else-if="node.type === 'end-node'" class="item-node menu-end-node">
      {{ node.name }}
    </div>
    <div v-else-if="node.type === 'in-node'" class="item-node menu-in-node">
      {{ node.name }}
    </div>
    <div v-else-if="node.type === 'out-node'" class="item-node menu-out-node">
      {{ node.name }}
    </div>
    <div v-else-if="node.type === 'cog-node'" class="item-node menu-cog-node">
      <div>
        <Icon :type="node.icon" />
        <span> {{ node.name }}</span>
      </div>
      <p>相关配置内容</p>
    </div>
    <div v-else-if="node.type === 'codepen-node'" class="item-node menu-codepen-node">
      <div>
        <Icon :type="node.icon" />
        <span> {{ node.name }}</span>
      </div>
      <p>相关配置内容</p>
    </div>
    <div v-else-if="node.type === 'pulse-node'" class="item-node menu-pulse-node">
      <div>
        <div>
          <Icon :type="node.icon" /> <span> {{ node.name }}</span>
        </div>
        <Icon type="md-power" />
      </div>
      <p>
        <span>执行状态：正在监听...</span>
        <span>98%</span>
      </p>
    </div>
    <div v-else>此节点无效</div>
  </div>
</template>
<script>
import jsp from "jsplumb";
export default {
  name: "menu-node",
  props: ["node"],
  mounted() {
    // console.log(this.node);
    this.$nextTick(() => {
      jsp.jsPlumb.draggable(this.node.id);
    });
  },
  methods: {
    handleSelectNode(node) {
      document.getElementsByClassName("item-node").forEach((ele) => {
        ele.classList.remove("active");
      });
      let nodeEle = document.getElementById(node.id);
      let { top, left } = nodeEle.style;
      let nodes = this.$store.state.flowData.nodes;
      nodes.forEach((item) => {
        if (item.id === node.id) {
          item.x = left.slice(0, left.length - 2) * 1;
          item.y = top.slice(0, top.length - 2) * 1;
        }
      });
      this.$store.commit("setFlowData", { nodes });
      nodeEle.getElementsByClassName("item-node")[0].classList.add("active");
      this.$store.commit("setSelectContent", { type: "node", data: node });
    },
  },
};
</script>

<style scoped lang="scss">
.node-warp {
  position: absolute;
  user-select: none;
  > div {
    background: #abc7ff31;
    border: 1px solid #abc7ff;
  }
  .active {
    border: 1px dashed #409eff;
    // outline: 1px dashed #409eff;
    // outline-offset: 0;
  }
  i {
    font-size: 16px;
  }
}
// .node-item {
//   padding: 20px;
//   position: absolute;
//   border: 2px solid transparent;
//   background: rgb(239, 154, 154);
//   .paint-box {
//     position: relative;
//     z-index: 2;
//     .paint {
//       position: absolute;
//       left: 50%;
//       top: 50%;
//       z-index: 2;
//       transform: translate(-50%, -50%);
//       background: coral;
//     }
//   }

// }
.menu-start-node {
  width: 100px;
  padding: 12px 18px;
  border-radius: 30px;
  text-align: center;
}
.menu-end-node {
  width: 100px;
  padding: 12px 18px;
  text-align: center;
}
.menu-in-node {
  padding: 0;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
}
.menu-out-node {
  padding: 0;
  width: 65px;
  height: 65px;
  border-radius: 100%;
  line-height: 60px;
  text-align: center;
}

.menu-cog-node {
  padding: 5px 10px;
  width: 240px;
  > div {
    font-size: 14px;
  }
  > p {
    font-size: 12px;
    margin-top: 2px;
    color: #999;
  }
}
.menu-codepen-node {
  width: 240px;
  > div {
    font-size: 14px;
    padding: 8px;
    background: cornflowerblue;
    color: cornsilk;
  }
  > p {
    // margin-left: 10px;
    padding: 10px;
    font-size: 12px;
    margin-top: 2px;
    color: #999;
  }
}
.menu-pulse-node {
  width: 240px;

  > div {
    font-size: 14px;
    padding: 8px;
    background: cornflowerblue;
    color: cornsilk;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  > p {
    // margin-left: 10px;
    padding: 10px;
    font-size: 12px;
    margin-top: 2px;
    color: #999;
    display: flex;
    justify-content: space-between;
  }
}
</style>
