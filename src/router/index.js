import Vue from 'vue'
import Router from 'vue-router'
import Skill from '../components/Skill'
import Developer from '../components/Developer'

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
  ]
})
