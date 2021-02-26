<template>
  <div
    class="index"
    id="zll-index"
    @mousemove.prevent="handleMousemove"
    @mouseup.prevent="handleMouseup"
  >
    <div class="flow-menu">
      <header>
        <h1>Vue Flow Topology</h1>
      </header>
      <div class="section">
        <FlowMenu @on-is-add-node="onIsAddNode" />
      </div>
    </div>
    <div class="middle">
      <header>
        <HeaderOperate ref="operate" />
      </header>
      <div class="section">
        <FlowContent ref="flowContent" @on-select-type="onSelectType" />
      </div>
    </div>
    <div class="flow-attr">
      <header>
        <header-attr />
      </header>
      <flow-attr />
    </div>
    <div class="modal-warp">
      <Modal
        v-model="isJsonView"
        footer-hide
        title="FlowData数据"
        width="600"
        :transfer="false"
        @on-cancel="handleCloseJsonView"
      >
        <json-viewer :expand-depth="1" copyable boxed :value="jsonData"></json-viewer>
      </Modal>
    </div>
  </div>
</template>

<script>
import jsp from "jsplumb";
import HeaderOperate from "@/components/modules/HeaderOperate";
import HeaderAttr from "@/components/modules/HeaderAttr";
import FlowMenu from "@/components/FlowMenu";
import FlowAttr from "@/components/FlowAttr";
import FlowContent from "@/components/FlowContent";
export default {
  name: "Index",
  components: {
    HeaderOperate,
    HeaderAttr,
    FlowMenu,
    FlowContent,
    FlowAttr,
  },
  data() {
    return {
      isMouseDownStop: false,
      isJsonView: false,
      jsonData: "暂无内容",
    };
  },
  computed: {
    flowMenuObj() {
      return this.$store.state.flowMenuObj;
    },
  },
  watch: {
    flowMenuObj(newVal, oldVal) {
      if (newVal.type === "view-code") {
        this.jsonData = this.$store.state.flowData;
        this.isJsonView = true;
      }
    },
  },
  created() {
    this.$store.commit("setJspInit", jsp.jsPlumb.getInstance({ Container: "zll-index" }));
  },
  mounted() {
    this.jsonData = this.$store.state.flowData;
  },
  methods: {
    onIsAddNode() {
      this.$refs.flowContent.onIsAddNode();
    },
    onSelectType(type) {
      this.$refs.operate.handleMiddleMenu(type);
    },
    handleCloseJsonView() {
      //  this.jsonData = this.$store.state.flowData;
    },
    handleMouseup(e) {
      this.isMouseDownStop = false;
    },
    handleMousemove(e) {
      if (this.isMouseDownStop) {
        this.flowAttrVerticalWidth =
          this.flowAttrVerticalWidthDown + this.mouseDownOffset - e.x;
        if (this.flowAttrVerticalWidth < 450) {
          this.flowAttrVerticalWidth = 450;
        }
        if (this.flowAttrVerticalWidth > 1200) {
          this.flowAttrVerticalWidth = 1200;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.index {
  display: flex;
  h1 {
    font-size: 18px;
  }
  > div {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .section {
    flex: 1;
  }
  header {
    height: 38px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-bottom: 1px solid #eee;
  }
  .flow-menu {
    width: 280px;
  }
  .middle {
    flex: 1;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }
  .flow-attr {
    width: 280px;
  }
  /deep/ .ivu-modal {
    margin-bottom: 50px;
    .jv-container.boxed:hover {
      box-shadow: none;
      border: 1px solid #eee;
      border-radius: 6px;
    }
  }
}
</style>
