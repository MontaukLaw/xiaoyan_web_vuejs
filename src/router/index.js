import Vue from 'vue'
import Router from 'vue-router'
import Skill from '../components/Skill'
import Developer from '../components/Developer'
import Example from '../components/Example'
import FileUpload from '../components/FileUpload'
import Images from '../components/Images'
import FeaturedContent from '../components/FeaturedContent'
import Banner from '../components/Banner'
import MiguVoice from '../components/MiguVoice'
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
      path: '/example',
      component: Example
    },
    {
      path: '/fileupload',
      component: FileUpload
    },
    {
      path: '/images',
      component: Images
    },
    {
      path: '/featuredcontent',
      component: FeaturedContent
    },
    {
      path: '/banner',
      component: Banner
    },
        {
      path: '/miguvoice',
      component: MiguVoice
    },
  ]
})
