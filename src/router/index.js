import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ArticleForm from '../views/article/ArticleForm.vue'
import ArticleDetail from '../views/article/ArticleDetail.vue'
import File from '../views/File'
import Photo from '../views/Photo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/article',
    name: 'Article',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/article/Article.vue')
  },
  {
    path: '/admin/article/:id(\\d+)',
    name: 'ArticleForm',
    component: ArticleForm
  },
  {
    path: '/admin/article-detail/:id(\\d+)',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/admin/file',
    name: 'File',
    component: File
  },
  {
    path: '/admin/image',
    name: 'Photo',
    component: Photo
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
