import { createWebHashHistory , createRouter } from 'vue-router'

import Layout from '../views/Main.vue'
import Login from '../views/login/index.vue'
import Admin from '../views/auth/admin/index.vue'
import Group from '../views/auth/group/index.vue'
import Order from '../views/vppz/order/index.vue'
import Dashboard from '../views/dashboard/index.vue'
import Staff from '../views/vppz/staff/index.vue'


const routes = [
  { 
    path: '/',
    component: Layout,
    // redirect: '/dashboard',
    name: 'main',
    children: [
      // {
      //   path: 'dashboard',
      //   meta: { id: '1', name: '控制台', icon: 'Platform', path: '/dashboard' },
      //   component: Dashboard
      // },
      // {
      //   path: 'auth',
      //   meta: { id: '2' ,name: '权限管理', icon: 'Grid' },
      //   children: [
      //     {
      //       path: '',
      //       alias: ['admin'],
      //       meta: { id: '1', name: '账号管理', icon: 'Avatar', path: '/auth/admin' },
      //       component: Admin
      //     },
      //     {
      //       path: 'group',
      //       meta: { id: '2', name: '菜单管理', icon: 'Menu', path: '/auth/group' },
      //       component: Group
      //     }
      //   ]
      // },
      // {
      //   path: 'vppz',
      //   meta: { id: '3', name: 'DIDI陪诊', icon: 'BellFilled' },
      //   children: [
      //     {
      //       path: '',
      //       alias: ['staff'],
      //       meta: { id: '1', name: '陪护管理', icon: 'Checked', path: '/vppz/staff' },
      //       component: Staff
      //     },
      //     {
      //       path: 'order',
      //       meta: { id: '2', name: '订单管理', icon: 'List', path: '/vppz/order' },
      //       component: Order
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '/login',
    component: Login
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})