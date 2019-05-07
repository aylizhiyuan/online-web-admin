// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//引入css文件
import 'normalize.css/normalize.css'
//引入element ui 组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import locale from 'element-ui/lib/locale/lang/en'

//引入全局的css文件
//安装node-sass sass-loader
import '@/styles/index.scss'

import App from './App'
import router from './router'
//状态管理
import store from './store'
//图标
import '@/icons'
//权限
import '@/permission'


Vue.use(ElementUI,{locale})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:h=>h(App)
})
