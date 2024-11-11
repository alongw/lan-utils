import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/pages/Home/Home.vue'),
    },
    {
      name: 'file',
      path: '/file',
      component: () => import('@/pages/File/File.vue'),
    },
    {
      name: 'chat',
      path: '/chat',
      component: () => import('@/pages/Chat/Chat.vue'),
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/pages/Login/Login.vue'),
    },
    {
      name: 'info',
      path: '/info',
      component: () => import('@/pages/Info/Info.vue'),
    },
  ],
})

export default router
