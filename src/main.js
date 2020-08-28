import Vue from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd)

import router from './router'

import VueContextMenu from 'vue-contextmenu'
Vue.use(VueContextMenu)

import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
