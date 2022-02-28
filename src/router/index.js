import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ArticleForm from '../views/article/ArticleForm.vue'
import ArticleDetail from '../views/article/ArticleDetail.vue'
import File from '../views/File'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/article',
    name: 'Article',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/article/Article.vue')
  },
  {
    path: '/article/:id(\\d+)',
    name: 'ArticleForm',
    component: ArticleForm
  },
  {
    path: '/article-detail/:id(\\d+)',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/file',
    name: 'File',
    component: File
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
