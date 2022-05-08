import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import History from '../views/front/History.vue'
import Login from '../views/Login.vue'
import ArticleForm from '../views/article/ArticleForm.vue'
import ArticleDetail from '../views/article/ArticleDetail.vue'
import File from '../views/File'
import Photo from '../views/Photo'
import Info from '@/views/info/Info'
import Words from '../views/word/Words'
import WordForm from '../views/word/WordForm'
import HomeAdmin from "@/views/home-admin/HomeAdmin";
import Test from '../views/Test'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/history',
    name: 'History',
    component: History
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
    path: '/admin/info',
    name: 'Info',
    component: Info
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
  {
    path: '/admin/word',
    name: 'Words',
    component: Words
  },
  {
    path: '/admin/word/:id(\\d+)',
    name: 'WordForm',
    component: WordForm
  },
  {
    path: '/admin/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/admin/home',
    name: 'HomeAdmin',
    component: HomeAdmin
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
