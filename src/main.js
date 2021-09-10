import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import Toast from 'components/common/toast'
// import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
// 安装toast插件 调用Toast的install方法
Vue.use(Toast)
// 图片懒加载
// Vue.use(VueLazyLoad,{
//   preLoad: 1,
//   loading: require('assets/img/common/placeholder.png')
// })

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
