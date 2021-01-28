<template>
  <div class="header-attr">
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: "header-attr",
  data() {
    return {
      title: "基本属性",
    };
  },
  computed: {
    selectContent() {
      return this.$store.state.selectContent;
    },
  },
  watch: {
    selectContent(data) {
      if (data.type === "node") {
        this.title = "节点属性";
      } else if (data.type === "link") {
        this.title = "连线属性";
      } else {
        this.title = "基本属性";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.header-attr {
  width: 100%;
  h3 {
    text-align: center;
  }
}
</style>
