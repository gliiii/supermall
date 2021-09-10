import Toast from './Toast'
let obj = {}

obj.install = function(Vue){
  // 创建组件构造器
  const toastConstructor = Vue.extend(Toast);

  // 实例化组件对象
  const toast = new toastConstructor()

  // 将组件对象，手动挂载到元素上
  toast.$mount(document.createElement('div'));

  // toasl.$el对应的就是div，将div添加到body中
  document.body.appendChild(toast.$el)

  // 将toast对象添加到vue原型上
  Vue.prototype.$toast = toast
}

export default obj
