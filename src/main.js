import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import "./style/init.scss"

import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer);

import events from "./utils";
Vue.prototype.$events = events;

Vue.config.productionTip = false;
Vue.use(ViewUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
