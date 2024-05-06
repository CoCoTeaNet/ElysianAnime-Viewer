/**
 * 基础路由
 * @type { *[] }
 */
const constantRouterMap = [
  {
    path: '/',
    name: 'Anime',
    redirect: { name: 'AnimeHomeIndex' },
    component: () => import('@/layout/MainLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'AnimeHomeIndex',
        component: () => import('@/views/anime/home/Home.vue')
      },
    ]
  },
  {
    path: '/video',
    name: 'AnimeVideoIndex',
    component: () => import('@/views/anime/video/Video.vue')
  },
  {
    path: '/login',
    name: 'LoginIndex',
    component: () => import('@/views/login/Login.vue')
  }
]

export default constantRouterMap