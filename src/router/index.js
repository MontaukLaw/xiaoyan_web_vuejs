import Vue from 'vue'
import Router from 'vue-router'
import Skill from '../components/Skill'
import Developer from '../components/Developer'
import Example from '../components/Example'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/develpoer',
      component: Developer
    },
    {
      path: '/skill',
      component: Skill
    },
    {
      path:'/example',
      component:Example
    }
  ]
})
