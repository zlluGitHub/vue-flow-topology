<template>
  <div class="index" id="zll-index">
    <div class="flow-menu">
      <header>Vue Flow Topology</header>
      <div class="section">
        <flow-menu />
      </div>
    </div>
    <div class="middle">
      <header>
        <ul>
          <li
            v-for="(item, i) in middleMenu"
            @click="handleMiddleMenu(item.type, i)"
            :key="'middle-menu-' + i"
            :class="[middleSelectType === item.type ? 'active' : '']"
          >
            <Tooltip :content="item.label" placement="bottom">
              <Icon :type="item.icon" />
            </Tooltip>
            <!-- <ol>
              <li>撒大声地</li>
            </ol> -->
          </li>
        </ul>
      </header>
      <div class="section">
        <FlowContent />
      </div>
    </div>
    <div class="aside-right">
      <header>flow</header>
      <AsideRight />
    </div>
  </div>
</template>

<script>
import FlowMenu from "@/components/FlowMenu";
import AsideRight from "@/components/AsideRight";
import FlowContent from "@/components/FlowContent";
export default {
  name: "Index",
  components: {
    FlowMenu,
    FlowContent,
    AsideRight,
  },
  data() {
    return {
      middleSelectType: "drag-drop", //操作类型
      connector: "Bezier", //连接线的样式
      middleMenu: [
        {
          icon: "ios-undo",
          label: "上一步",
          type: "last-step",
        },
        {
          icon: "ios-redo",
          label: "下一步",
          type: "next-step",
        },
        {
          icon: "md-move",
          label: "拖拽",
          type: "drag-drop",
        },
        {
          icon: "md-git-network",
          label: "连线",
          type: "connection",
          child: [
            {
              label: "折线",
              type: "connection",
            },
            {
              label: "折线",
              type: "connection",
            },
            {
              label: "折线",
              type: "connection",
            },
          ],
        },
        {
          icon: "md-cut",
          label: "裁剪",
          type: "tailoring",
        },
        {
          icon: "md-sync",
          label: "重置",
          type: "reset",
        },
      ],
    };
  },
  methods: {
    handleMiddleMenu(type, i, connector) {
      this.middleSelectType = type;
      this.connector = connector;
      this.$store.commit("setFlowMenuObj", { type, connector });
    },
  },
};
</script>
<style lang="scss" scoped>
.index {
  display: flex;
  > div {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .section {
    flex: 1;
  }
  header {
    padding: 5px 15px;
    border-bottom: 1px solid #eee;
    // height: 40px;
    > ul {
      display: flex;
      list-style: none;
    }
  }
  .flow-menu {
    width: 280px;
  }
  .middle {
    flex: 1;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    header {
      > ul {
        > li {
          cursor: pointer;
          margin-right: 18px;
          font-size: 18px;
          position: relative;
          &.active {
            color: #2d8cf0;
          }
          > ol {
            list-style: none;
            position: absolute;
            top: 30px;
            font-size: 12px;
            li {
            }
          }
        }
      }
    }
  }
  .aside-right {
    width: 280px;
  }
}
</style>
