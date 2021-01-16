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
            @mousedown="handlerMousedown($event, node, i, n)"
          >
            <div :id="'node-' + i + '-' + n">
              <MenuNode :class="['menu-node', node.type]" :node="node" />
            </div>
          </li>
        </ol>
      </li>
    </ul>
  </aside>
</template>
<script>
import MenuNode from "./modules/MenuNode";
export default {
  name: "FlowMenu",
  components: { MenuNode },
  data() {
    return {
      copyNode: null,
      nodePosition: {},
      menuList: [
        {
          name: "基础节点",
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
              name: "输入",
              type: "in-node",
            },
            {
              name: "输出",
              type: "out-node",
            },
          ],
        },
        {
          name: "组合节点",
          child: [
            {
              name: "基础配置",
              type: "cog-node",
              icon: "md-cog",
            },
            {
              name: "抽离模块",
              type: "codepen-node",
              icon: "md-cube",
            },
            {
              name: "进程监听",
              type: "pulse-node",
              icon: "md-pulse",
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
      let offsetLeft = document.getElementById(`node-${i + "-" + n}`).offsetLeft;
      let offsetTop = document.getElementById(`node-${i + "-" + n}`).offsetTop;
      this.$store.commit("setNewNode", {
        state: true,
        node: Object.assign(
          {
            name: item.name,
            type: item.type,
          },
          {
            x: event.clientX - offsetLeft,
            y: event.clientY - offsetTop,
          }
        ),
      });
      let node = document.getElementById(item.type + "-" + i + "-" + n);
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
  padding: 0px;
  > ul {
    list-style: none;
    > li {
      margin-bottom: 10px;
      font-size: 12px;
      .menu-title {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        margin-top: 10px;
        font-size: 14px;
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
        > li {
          > div {
            margin: 10px 20px;
            cursor: move;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
