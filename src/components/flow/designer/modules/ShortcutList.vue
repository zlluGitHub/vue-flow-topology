<template>
  <div class="shortcut-list">
    <div class="title">快捷鍵</div>
    <ul>
      <li v-for="(item,i) in dataSource" :key="'vis'+i">
        <span>{{item.codeName}}</span>：
        <span>{{item.shortcutName}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { flowConfig } from "../config/args-config.js";

export default {
  data() {
    return {
      visible: false,
      dataSource: [],
    };
  },
  created() {
    this.visible = true;
    let obj = Object.assign({}, flowConfig.shortcut);
    for (let k in obj) {
      this.dataSource.push(obj[k]);
    }
    console.log(this.dataSource);
  },
};
</script>

<style lang="scss" scoped>
.shortcut-list {
  background: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 0; 
  font-size: 12px;
  .title {
    color: #262626;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
    padding: 5px 20px;
   
    margin-bottom: 10px;
  }
}
</style>