<template>
  <aside>
    <ul>
      <li v-for="(item, i) in menuList" :key="'key-' + i">
        <div class="menu-title">{{ item.name }}</div>
        <ol>
          <li
            v-for="(node, n) in item.child"
            :key="'key-' + 'i-' + n"
            :id="node.type + '-' + i + '-' + n"
            :class="item.class"
            @mousedown="handlerMousedown($event, node, i, n)"
          >
            <MenuNode :class="['menu-node', node.type]" :node="node" />
          </li>
        </ol>
      </li>
    </ul>
  </aside>
</template>
<script>
import MenuNode from "./modules/MenuNode";
export default {
  name: "aside-left",
  components: { MenuNode },
  data() {
    return {
      copyNode: null,
      nodePosition: {},
      menuList: [
        {
          name: "基础节点",
          class: "base-warp",
          child: [
            {
              name: "起始节点",
              type: "start-node",
            },
            {
              name: "终止节点",
              type: "end-node",
            },
            {
              name: "输入节点",
              type: "in-node",
            },
            {
              name: "输出节点",
              type: "out-node",
            },
          ],
        },
        {
          name: "组合节点",
          class: "combination-warp",
          child: [
            {
              name: "基础配置",
              type: "cog-node",
              icon: "md-cog",
            },
            {
              name: "抽离模块",
              type: "codepen-node",
              icon: "logo-codepen",
            },
            {
              name: "进程监听",
              type: "pulse-node",
              icon: "md-pulse",
            },
            {
              name: "关联模块",
              type: "link-node",
              icon: "ios-link",
            },
          ],
        },
      ],
    };
  },
  props: {
    msg: String,
  },
  mounted() {
    document.querySelector("#zll-index").onmousemove = (e) => {
      let event = e || window.event || event;
      if (this.copyNode) {
        this.copyNode.style.top = `${event.y - this.nodePosition.offsetY}px`;
        this.copyNode.style.left = `${event.x - this.nodePosition.offsetX}px`;
      }
    };
    document.querySelector("#zll-index").onmouseup = (e) => {
      let event = e || window.event || event;
      this.$store.commit("setNewNode", { state: false });
      if (this.copyNode) {
        this.copyNode.remove();
        this.copyNode = null;
      }
    };
  },
  methods: {
    handlerMousedown(e, item, i, n) {
      let event = e || window.event || event;
      let offsetY = 0;
      this.$store.commit("setNewNode", { state: true, node: item });
      let node = document.querySelector("#" + item.type + "-" + i + "-" + n);
      this.nodePosition = {
        offsetX: event.x - node.offsetLeft,
        offsetY: event.y - node.offsetTop,
      };
      this.copyNode = node.cloneNode(true);
      this.copyNode.className += " copy";
      this.copyNode.style.top = `${event.y - this.nodePosition.offsetY}px`;
      this.copyNode.style.left = `${event.x - this.nodePosition.offsetX}px`;
      node.parentNode.appendChild(this.copyNode);
    },
  },
};
</script>

<style scoped lang="scss">
aside {
  padding: 20px;
  > ul {
    list-style: none;
    > li {
      margin-bottom: 10px;
      font-size: 12px;
      .menu-title {
        width: 100%;
      }

      > ol {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        .copy {
          position: fixed;
          z-index: 1;
          opacity: 0.5;
        }
      }
    }
  }
  // 基础节点
  li.base-warp {
    width: 120px;
    > div {
      cursor: move;
      padding: 15px 25px;
      margin: 10px;
      user-select: none;
      background: #abc7ff31;
      border: 1px solid #abc7ff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &#start-node-0-0 {
      > div {
        border-radius: 30px;
      }
    }
    &#in-node-0-2 {
      > div {
        padding: 0;
        width: 60px;
        height: 60px;
        margin-left: 28px;
      }
      // clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
      // transition: 1s clip-path 1px solid #abc7ff;
    }
    &#out-node-0-3 {
      > div {
        padding: 0;
        width: 65px;
        height: 65px;
        margin-left: 22px;
        border-radius: 100%;
      }
    }
  }

  // 组合节点
  li.combination-warp {
    width: 240px;
    > div {
      cursor: move;
      padding: 10px;
      margin: 10px;
      user-select: none;
      background: #abc7ff31;
      border: 1px solid #abc7ff;
    }
    &#start-node-0-0 {
      > div {
        border-radius: 30px;
      }
    }
    &#in-node-0-2 {
      > div {
        padding: 0;
        width: 60px;
        height: 60px;
        margin-left: 28px;
      }
      // clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
      // transition: 1s clip-path 1px solid #abc7ff;
    }
    &#out-node-0-3 {
      > div {
        padding: 0;
        width: 65px;
        height: 65px;
        margin-left: 22px;
        border-radius: 100%;
      }
    }
  }
}
</style>
