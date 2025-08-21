import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'

//路由守卫
router.beforeEach((to, from) => {
  const token = localStorage.getItem('pz_token')
  //非登录页面token不存在
  if (!token && to.path !== '/login') {
    return '/login'
  } else if (token && to.path === '/login') {
    return '/'
  } else {
    return true
  }

})

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


//路由挂载
app.use(router)
//状态管理挂载
app.use(store)
app.mount('#app')
