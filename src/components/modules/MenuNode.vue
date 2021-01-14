<template>
  <div v-if="node.type === 'start-node'">
    {{ node.name }}
  </div>
  <div v-else-if="node.type === 'end-node'">
    {{ node.name }}
  </div>
  <div v-else-if="node.type === 'in-node'">
    {{ node.name }}
  </div>
  <div v-else-if="node.type === 'out-node'">
    {{ node.name }}
  </div>
  <div v-else></div>
</template>
<script>
export default {
  name: "menu-node",
  data() {
    return {};
  },
  props: ["node"],
  mounted() {},
  methods: {
    handlerMousedown(e, item, i, n) {},
  },
};
</script>

<style scoped lang="scss"></style>
