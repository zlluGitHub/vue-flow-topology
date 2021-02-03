<template>
  <aside>
    <!-- 节点属性 -->
    <div v-if="type === 'node'">
      <ul v-if="content.type === 'pulse-node'">
        <li>
          <label>节点Id</label>
          <Input
            disabled
            v-model="content.id"
            placeholder="Enter something..."
            style="width: 100%"
          />
        </li>
        <li>
          <label>节点类型</label>
          <Input
            disabled
            v-model="content.type"
            placeholder="Enter something..."
            style="width: 100%"
          />
        </li>
        <li>
          <label>节点名称</label>
          <Input
            v-model="content.name"
            placeholder="Enter something..."
            style="width: 100%"
          />
        </li>
      </ul>

      <ul v-else>
        <li>
          <label>节点Id</label>
          <Input
            disabled
            v-model="content.id"
            placeholder="Enter something..."
            style="width: 100%"
          />
        </li>
        <li>
          <label>节点类型</label>
          <Input
            disabled
            v-model="content.type"
            placeholder="Enter something..."
            style="width: 100%"
          />
        </li>
        <li>
          <label>节点名称</label>
          <Input
            v-model="content.name"
            placeholder="Enter something..."
            style="width: 100%"
          />
        </li>
      </ul>
    </div>
    <!-- 连线属性 -->
    <div v-else-if="type === 'link'">
      <ul>
        <li>
          <label>源节点Id</label>
          <Input
            disabled
            v-model="content.sourceId"
            placeholder="Enter something..."
            style="width: 100%"
          />
        </li>
        <li>
          <label>目标节点Id</label>
          <Input
            disabled
            v-model="content.targetId"
            placeholder="Enter something..."
            style="width: 100%"
          />
        </li>
        <li>
          <label>连线类型</label>
          <Input
            disabled
            v-model="content.connector"
            placeholder="Enter something..."
            style="width: 100%"
          />
        </li>
        <li>
          <label>文本注释</label>
          <Input
            v-model="content.label"
            placeholder="请输入注释内容..."
            style="width: 100%"
            @on-change="linkLabelChange"
          />
        </li>
      </ul>
    </div>
    <!-- 基础属性 -->
    <div v-else>
      <ul>
        <li>
          <label>拓展图名称</label>
          <Input
            v-model="content.title"
            placeholder="请输入内容..."
            style="width: 100%"
          />
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: "FlowAttr",
  data() {
    return {
      content: {},
      type: "",
      jspInit: this.$store.state.jspInit,
    };
  },
  computed: {
    selectContent() {
      return this.$store.state.selectContent;
    },
  },
  watch: {
    selectContent(data) {
      this.content = data.data;
      this.type = data.type;
    },
  },
  mounted() {
    this.content = this.$store.state.flowData;
  },
  methods: {
    linkLabelChange(e) {
      let label = e.target.value;
      let conn = this.jspInit.getConnections({
        source: this.content.sourceId,
        target: this.content.targetId,
      })[0];
      if (label != "") {
        conn.setLabel({
          label: label,
          cssClass: "link-label",
        });
      } else {
        let labelOverlay = conn.getLabelOverlay();
        if (labelOverlay) conn.removeOverlay(labelOverlay.id);
      }
    },
  },
};
</script>

<style scoped lang="scss">
aside {
  padding: 20px;
  ul {
    list-style: none;
    li {
      margin-bottom: 25px;
      > label {
        display: block;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
