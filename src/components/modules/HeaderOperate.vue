<template>
  <div class="operate-menu">
    <ul class="left">
      <li
        @click.stop="handleMiddleMenu('upper-step')"
        :class="[middleSelectType === 'upper-step' ? 'active' : '']"
      >
        <Tooltip content="上一步" placement="bottom">
          <Icon type="ios-undo" />
        </Tooltip>
      </li>
      <li
        @click.stop="handleMiddleMenu('next-step')"
        :class="[middleSelectType === 'next-step' ? 'active' : '']"
      >
        <Tooltip content="下一步" placement="bottom">
          <Icon type="ios-redo" />
        </Tooltip>
      </li>
      <li
        @click.stop="handleMiddleMenu('drag-drop')"
        :class="[middleSelectType === 'drag-drop' ? 'active' : '']"
      >
        <Tooltip content="拖拽" placement="bottom">
          <Icon type="md-move" />
        </Tooltip>
      </li>
      <li>
        <Dropdown trigger="click">
          <!-- <Icon type="md-git-network" /> -->
          <div class="svg-icon" v-html="selectLineSvg"></div>
          <DropdownMenu slot="list">
            <DropdownItem @click.stop.native="handleMiddleMenu('connection', 'Bezier')">
              <div class="svg-icon" v-html="BezierSvg"></div
            ></DropdownItem>
            <DropdownItem @click.stop.native="handleMiddleMenu('connection', 'Flowchart')">
              <div class="svg-icon" v-html="FlowchartSvg"></div
            ></DropdownItem>
            <DropdownItem @click.stop.native="handleMiddleMenu('connection', 'Straight')">
              <div class="svg-icon" v-html="StraightSvg"></div
            ></DropdownItem>
            <DropdownItem @click.stop.native="handleMiddleMenu('connection', 'StateMachine')">
              <div class="svg-icon" v-html="StateMachineSvg"></div
            ></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </li>
      <li @click.stop="handleMiddleMenu('enlarge')">
        <Tooltip content="放大" placement="bottom">
          <div class="svg-icon" v-html="EnlargeSvg"></div>
        </Tooltip>
      </li>
      <li @click.stop="handleMiddleMenu('narrow')">
        <Tooltip content="缩小" placement="bottom">
          <div class="svg-icon" v-html="NarrowSvg"></div>
        </Tooltip>
      </li>
    </ul>
    <ul class="right">
      <li
        @click.stop="handleMiddleMenu('import')"
        :class="[middleSelectType === 'import' ? 'active' : '']"
      >
        <Tooltip content="导入工作流" placement="bottom">
          <Icon type="ios-cloud-upload-outline" />
        </Tooltip>
      </li>
      <li
        @click.stop="handleMiddleMenu('export')"
        :class="[middleSelectType === 'export' ? 'active' : '']"
      >
        <Tooltip content="导出工作流" placement="bottom">
          <Icon type="ios-cloud-download-outline" />
        </Tooltip>
      </li>
      <li
        @click.stop="handleMiddleMenu('restore')"
        :class="[middleSelectType === 'restore' ? 'active' : '']"
      >
        <Tooltip content="还原视图" placement="bottom">
          <Icon type="md-locate" />
        </Tooltip>
      </li>
      <li
        @click.stop="handleMiddleMenu('view-code')"
        :class="[middleSelectType === 'view-code' ? 'active' : '']"
      >
        <Tooltip content="查看Json数据" placement="bottom">
          <Icon type="md-code-working" />
        </Tooltip>
      </li>
      <li
        @click.stop="handleMiddleMenu('reset')"
        :class="[middleSelectType === 'reset' ? 'active' : '']"
      >
        <Tooltip content="重置" placement="bottom">
          <Icon type="md-refresh-circle" />
        </Tooltip>
      </li>
      <li
        @click.stop="handleMiddleMenu('save')"
        :class="[middleSelectType === 'save' ? 'active' : '']"
      >
        <Tooltip content="保存画布" placement="bottom">
          <Icon type="md-filing" />
        </Tooltip>
      </li>
      <li
        @click.stop="handleMiddleMenu('clear')"
        :class="[middleSelectType === 'clear' ? 'active' : '']"
      >
        <Tooltip content="清空画布" placement="bottom">
          <Icon type="ios-trash" />
        </Tooltip>
      </li>
    </ul>
  </div>
</template>
<script>
import {
  BezierSvg,
  FlowchartSvg,
  StraightSvg,
  StateMachineSvg,
  EnlargeSvg,
  NarrowSvg,
} from "@/config/icon.config";
export default {
  name: "operate-menu",
  data() {
    return {
      // color: "#707070",
      BezierSvg: "",
      FlowchartSvg: "",
      StateMachineSvg: "",
      EnlargeSvg: "",
      NarrowSvg: "",
      StraightSvg: "",
      middleSelectType: "drag-drop", //操作类型
      selectLineSvg: "", //连接线的样式
      connector: "",
    };
  },
  created() {
    this.iconSvgInit();
    this.selectLineSvg = BezierSvg("#707070");
  },
  methods: {
    handleMiddleMenu(type, connector) {
      console.log(type);
      this.middleSelectType = type;
      this.iconSvgInit();
      if (type === "connection") {
        this.connector = connector;
        this.changeColor(this.connector, "#2d8cf0");
      } else if (type === "enlarge") {
        this.EnlargeSvg = EnlargeSvg("#2d8cf0");
      } else if (type === "narrow") {
        this.NarrowSvg = NarrowSvg("#2d8cf0");
      } else {
        this.changeColor(this.connector, "#707070");
      }
      this.$store.commit("setFlowMenuObj", { type, connector });
    },
    changeColor(connector, color) {
      if (connector === "Bezier") {
        this.BezierSvg = BezierSvg(color);
        this.selectLineSvg = this.BezierSvg;
      } else if (connector === "Flowchart") {
        this.FlowchartSvg = FlowchartSvg(color);
        this.selectLineSvg = this.FlowchartSvg;
      } else if (connector === "StateMachine") {
        this.StateMachineSvg = StateMachineSvg(color);
        this.selectLineSvg = this.StateMachineSvg;
      } else if (connector === "Straight") {
        this.StraightSvg = StraightSvg(color);
        this.selectLineSvg = this.StraightSvg;
      }
    },
    iconSvgInit() {
      this.BezierSvg = BezierSvg("#707070");
      this.FlowchartSvg = FlowchartSvg("#707070");
      this.StateMachineSvg = StateMachineSvg("#707070");
      this.StraightSvg = StraightSvg("#707070");
      this.EnlargeSvg = EnlargeSvg("#707070");
      this.NarrowSvg = NarrowSvg("#707070");
    },
  },
};
</script>

<style scoped lang="scss">
.operate-menu {
  width: 100%;
  display: flex;
  justify-content: space-between;
  > ul {
    display: flex;
    list-style: none;
    > li {
      cursor: pointer;
      margin-right: 18px;
      font-size: 18px;
      position: relative;
      display: flex;
      align-items: center;
      &.active {
        color: #2d8cf0;
      }
      .svg-icon {
        display: flex;
        justify-content: center;
        svg {
          path {
            fill: chartreuse !important;
          }
        }
      }
    }
  }
  /deep/ .ivu-tooltip {
    display: flex;
    align-items: center;
  }
}
</style>
