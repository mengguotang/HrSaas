import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 引入混入对象
import checkPermission from '@/mixin/checkPermission'

import * as directives from '@/directives' // 引入全部的自定义指令

// 引入过滤器
import * as filters from '@/filters'

// 引入自定义插件
import Components from '@/components'

// 全局注册自定义指令 (每一个声明的自定义指令都会被遍历注册)
Object.keys(directives).forEach(key => Vue.directive(key, directives[key]))

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 全局注册自定义插件
Vue.use(Components)

// 全局混入 所有的vue组件都会混入一个对象
Vue.mixin(checkPermission)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
