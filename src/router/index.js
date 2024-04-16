import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
import Dashboard from '../views/Dashboard.vue'
import InstanceShowView from '../views/instances/InstanceShowView.vue'
import InstanceIndexView from '../views/instances/InstanceIndexView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'instances',
        name: 'instance.index',
        component: InstanceIndexView,
      },
      {
        path: '/instances/:id',
        name: 'instance.show',
        component: InstanceShowView,
        props: true,
        children: [
          {
            path: 'edit',
            name: 'instance.edit',
          },
          {
            path: 'plugins',
            name: 'instance.plugins',
          },
          {
            path: 'scripts',
            name: 'instance.scripts',
          },
        ],
      },
      {
        path: 'plugins',
        name: 'plugin.index',
        component: () => import('@/views/Plugins'),
      },
      {
        path: 'scripts',
        name: 'script.index',
        component: () => import('@/views/Scripts'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
