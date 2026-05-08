import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

const Head = () => import('@/views/Head/index.vue')
const HomePage = () => import('@/views/HomePage/index.vue')
const Account = () => import('@/views/Account/index.vue')
const RoleInfo = () => import('@/views/RoleInfo/index.vue')
const WeaponInfo = () => import('@/views/WeaponInfo/index.vue')
const TheWord = () => import('@/views/TheWord/index.vue')
const IllustrationBook = () => import('@/views/IllustrationBook/index.vue')
const Gallery = () => import('@/views/Gallery/index.vue')
const Wallpaper = () => import('@/views/Wallpaper/index.vue')
const Video = () => import('@/views/Video/index.vue')

import { isTokenValid, removeToken } from '@/utils/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Head,
      children: [
        {
          path: '/',
          component: HomePage
        },
        {
          path: '/illustration',
          component: IllustrationBook,
          meta: { requiresAuth: true },
        },
        {
          path: '/roleinfo',
          component: RoleInfo,
          meta: { requiresAuth: true }
        },
        {
          path: '/weaponinfo',
          component: WeaponInfo,
          meta: { requiresAuth: true }
        },
        {
          path: '/gallery',
          component: Gallery
        },
        {
          path: '/wallpaper',
          component: Wallpaper,
          meta: { requiresAuth: true }
        },
        {
          path: '/video',
          component: Video,
          meta: { requiresAuth: true }
        },
        {
          path: '/theword',
          component: TheWord
        }
      ]
    },
    {
      path: '/account',
      component: Account
    }
  ],
})

router.beforeEach((to, from, next) => {
  // 若页面需要登录，且token无效，则跳转到登录页
  if (to.meta.requiresAuth && !isTokenValid()) {
    removeToken();
    next('/account');
    ElMessage.error('请先登录账号')
  } else {
    next();
  }
});

export default router
