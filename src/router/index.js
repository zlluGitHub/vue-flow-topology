import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash', //默认 有#号
  routes: [
    {
      path: '/',
      name: 'flow',
      component: () => import('../components/flow/designer/FlowDesigner')
    }
  ]
})
