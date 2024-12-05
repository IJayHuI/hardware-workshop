import { createWebHistory, createRouter } from 'vue-router'

import AppHome from '../views/AppHome.vue'
import AppAccount from '../views/AppAccount.vue'
import AppProductDetail from '../views/AppProductDetail.vue'
import AppCart from '../views/AppCart.vue'
import AppHardwareClass from '../views/AppHardWareClass.vue'
import AppSearch from '../views/AppSearch.vue'

const routes = [
  { path: '/', component: AppHome },
  { path: '/account', component: AppAccount },
  { path: '/product-detail', component: AppProductDetail },
  { path: '/cpu', component: AppHardwareClass },
  { path: '/mainboard', component: AppHardwareClass },
  { path: '/ram', component: AppHardwareClass },
  { path: '/gpu', component: AppHardwareClass },
  { path: '/power', component: AppHardwareClass },
  { path: '/crate', component: AppHardwareClass },
  { path: '/radiator', component: AppHardwareClass },
  { path: '/harddisk', component: AppHardwareClass },
  { path: '/perripheral', component: AppHardwareClass },
  { path: '/cart', component: AppCart },
  { path: '/search', component: AppSearch }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/cart' && sessionStorage.getItem('loginStatus')) {
    // 如果未登录，访问 /cart 路由时跳转到 /account
    next('/account')
  } else {
    // 其他情况继续访问
    next()
  }
})

export default router
