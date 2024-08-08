/**
 * 基础路由
 * @type { *[] }
 */
const constantRouterMap = [
  {
    path: '/',
    name: 'Anime',
    redirect: { name: 'AnimeHome' },
    component: () => import('@/layout/MainLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'AnimeHome',
        component: () => import('@/views/anime/home/Home.vue')
      },
      {
        path: '/user',
        name: 'AnimeUser',
        component: () => import('@/views/anime/user/User.vue')
      },
    ]
  },
  {
    path: '/video',
    name: 'AnimeVideo',
    component: () => import('@/views/anime/video/Video.vue')
  },
  {
    path: '/login',
    name: 'LoginIndex',
    component: () => import('@/views/login/Login.vue')
  }
]

export default constantRouterMap