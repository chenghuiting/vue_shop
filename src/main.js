import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 配置 vue-table-with-tree-grid
import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)

// 配置 ElementUI
import ElementUI, { Message, MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// 将message挂载为 vue 原型上的一个属性，这样就可以在每个组件中都可以通过 this. 来拿到$message，从而来使用其方法
Vue.prototype.$message = Message
// Vue.prototype.$confirm=MessageBox.confirm

// 配置 axios
import axios from 'axios';

// 配置请求的根路径
axios.defaults.baseURL = 'https://api.naccl.top/vue/shop/api/private/v1/'

// 在 request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})

// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$http = axios

// 导入字体图标
import './assets/fonts/iconfont.css'

// 导入全局样式表
import './assets/css/global.css'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)

// 导入 nprogress 包对应的 js和 css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

// 定义全局事件过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  // return `yyyy-mm-dd hh:mm:ss`
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
