<template>
  <div>
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
    <div v-else>无效节点</div>
  </div>
</template>
<script>
export default {
  name: "menu-node",
  props: ["node"]
};
</script>

<style scoped lang="scss">
.item-node {
  user-select: none;
  background: #abc7ff31;
  border: 1px solid #abc7ff;
  i {
    font-size: 16px;
  }
}
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
  margin-left: 28px;
  text-align: center;
  line-height: 60px;
}
.menu-out-node {
  padding: 0;
  width: 65px;
  height: 65px;
  margin-left: 22px;
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
