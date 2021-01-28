<template>
  <div class="right-menu" ref="menu">
    <ul v-if="type === 'node'">
      <li @click.stop="handleClick('delete-node')">删除节点</li>
      <li @click.stop="handleClick('copy')">复制节点</li>
    </ul>
    <ul v-else-if="type === 'flow'">
      <li @click.stop="handleClick('paste', $event)">粘贴节点</li>
      <li @click.stop="handleClick('save')">保存流程</li>
    </ul>
    <ul v-else-if="type === 'link'">
      <li @click.stop="handleClick('delete-link')">删除连线</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "contextmenu",
  // data() {
  //   return {
  //     nodes: [],
  //   };
  // },
  props: ["type"],
  mounted() {
    // let menu = this.$refs.menu;
    // document.oncontextmenu = function (ev) {
    //   // let ev = ev || event;
    //   // let scrollTop =
    //   //   document.documentElement.scrollTop || document.body.scrollTop;
    //   // menu.style.display = "block";
    //   // let zoom = 1;
    //   // if (screen.width > 1300) {
    //   //   // let zoom = 0.9;
    //   // }
    //   // menu.style.left = ev.clientX * zoom + "px";
    //   // //当滑动滚动条时也能准确获取菜单位置
    //   // menu.style.top = (ev.clientY + scrollTop) * zoom + "px";
    //   //阻止默认事件
    //   return false;
    // };
    // let app = document.querySelector("body");
    // app.onclick = function(params) {
    //   menu.style.display = "none";
    // };
  },
  methods: {
    handleClick(type, event) {
      this.$emit("on-click", { type, event });
    },
    hide() {
      let menu = this.$refs.menu;
      menu.style.display = "none";
    },
    show() {
      let menu = this.$refs.menu;
      menu.style.display = "block";
    },
  },
};
</script>

<style scoped lang="scss">
.right-menu {
  position: fixed;
  top: 30px;
  left: 40px;
  z-index: 10;
  background: #fff;
  border: 1px solid rgba(177, 177, 177, 0.4);
  border-bottom: 0;
  ul {
    list-style: none;
    font-size: 12px;
    li {
      padding: 10px 20px;
      cursor: pointer;
      border-bottom: 1px solid rgba(177, 177, 177, 0.4);
      &:hover {
        color: cornflowerblue;
      }
    }
  }
}
</style>
