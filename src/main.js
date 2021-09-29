import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 配置 vue-table-with-tree-grid
import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table',TreeTable)

// 配置 ElementUI
import ElementUI, { Message, MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// 将message挂载为 vue 原型上的一个属性，这样就可以在每个组件中都可以通过 this. 来拿到$message，从而来使用其方法
Vue.prototype.$message=Message
// Vue.prototype.$confirm=MessageBox.confirm

// 配置 axios
import axios from 'axios';
// 配置请求的根路径
axios.defaults.baseURL='https://api.naccl.top/vue/shop/api/private/v1/'
axios.interceptors.request.use(config=>{
  console.log(config);
  config.headers.Authorization=window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
Vue.prototype.$http=axios

// 导入字体图标
import './assets/fonts/iconfont.css'

// 导入全局样式表
import './assets/css/global.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
