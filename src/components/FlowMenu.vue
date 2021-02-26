<template>
  <aside>
    <ul ref="flowMenu">
      <li v-for="(item, i) in menuList" :key="'key-' + i">
        <div class="menu-title">{{ item.name }}</div>
        <ol>
          <li
            v-for="(node, n) in item.child"
            :key="'key-' + n"
            @mousedown="handlerMousedown($event, node)"
          >
            <MenuNode :id="node.id" :node="node" />
          </li>
        </ol>
      </li>
    </ul>
  </aside>
</template>
<script>
import MenuNode from "./modules/MenuNode";
import { deepClone } from "@/utils";
export default {
  name: "FlowMenu",
  components: { MenuNode },
  data() {
    return {
      copyNode: null,
      nodePosition: {},
      nodeData: {},
      isAddNode: false,

      // node节点
      menuList: [
        {
          name: "基础节点",
          child: [
            {
              name: "起始节点",
              type: "start-node",
              id: "node-0",
            },
            {
              name: "终止节点",
              type: "end-node",
              id: "node-1",
            },
            {
              name: "输入",
              type: "in-node",
              id: "node-2",
            },
            {
              name: "输出",
              type: "out-node",
              id: "node-3",
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
              id: "node-4",
            },
            {
              name: "抽离模块",
              type: "codepen-node",
              icon: "md-cube",
              id: "node-5",
            },
            {
              name: "进程监听",
              type: "pulse-node",
              icon: "md-pulse",
              id: "node-6",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    document.querySelector("#zll-index").onmousemove = (e) => {
      let event = e || window.event || event;
      if (this.copyNode) {
        let top = event.y - this.nodePosition.offsetY;
        let left = event.x - this.nodePosition.offsetX;

        this.copyNode.style.top = `${top}px`;
        this.copyNode.style.left = `${left}px`;

        // 菜单宽度
        let flowMenuWidth = this.$refs.flowMenu.offsetWidth;
        this.isAddNode = left - this.copyStyleLeft > flowMenuWidth ? true : false;
      }
    };
    document.querySelector("#zll-index").onmouseup = (e) => {
      let event = e || window.event || event;
      // this.$store.commit("setNewNode", { state: false });
      if (this.copyNode) {
        this.copyNode.remove();
        this.copyNode = null;
        this.$store.commit("setNewNode", {
          state: this.isAddNode,
          node: this.nodeData,
        });
        this.$emit("on-is-add-node", this.isAddNode);
      }
    };
  },
  methods: {
    handlerMousedown(e, item) {
      let event = e || window.event || event;
      let nodeEle = document.getElementById(item.id);
      let { left, top } = nodeEle.getBoundingClientRect();

      this.nodeData = Object.assign(deepClone(item), {
        x: event.clientX - left,
        y: event.clientY - top,
      });
      this.nodePosition = {
        offsetX: event.x - left,
        offsetY: event.y - top,
      };
      this.copyNode = nodeEle.cloneNode(true);
      this.copyNode.className += " copy";

      let y = event.y - this.nodePosition.offsetY;
      let x = event.x - this.nodePosition.offsetX;
      this.copyNode.style.top = `${y}px`;
      this.copyNode.style.left = `${x}px`;
      this.copyNode.style.borderBottom = 0;
      this.copyStyleLeft = x;
      nodeEle.parentNode.appendChild(this.copyNode);
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
          margin: 10px 20px;
          > div {
            //
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
