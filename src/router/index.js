import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/recommend/recommend.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/songList/:id',
    name: 'SongList',
    component: () => import('../views/songList/index.vue')
  },
  {
    path: '/musicList',
    name: 'MusicList',
    component: () => import('../views/musicList/musicList.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
