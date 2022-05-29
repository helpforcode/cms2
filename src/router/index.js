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
import InfoForm from '@/views/info/InfoForm'
import InfoDetail from '@/views/front/info/InfoDetail'
import InfoCateForm from '@/views/info/InfoCateForm'
import Prop from '@/views/prop/Prop'
import PropForm from "@/views/prop/PropForm";
import PropTypeForm from "@/views/prop/PropTypeForm";
import Words from '../views/word/Words'
import WordForm from '../views/word/WordForm'
import HomeAdmin from "@/views/home-admin/HomeAdmin";
import Test from '../views/Test'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      anon: true,
    }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: {
      anon: true,
    }
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
    path: '/admin/info/:cateId(\\d+)/:id(\\d+)',
    name: 'InfoForm',
    component: InfoForm
  },
  {
    path: '/info/detail/:cateId(\\d+)/:title',
    name: 'InfoDetail',
    component: InfoDetail
  },
  {
    path: '/admin/info/:id(\\d+)',
    name: 'InfoCateForm',
    component: InfoCateForm
  },
  {
    path: '/admin/prop',
    name: 'Prop',
    component: Prop
  },
  {
    path: '/admin/prop/:typeId(\\d+)/:id(\\d+)',
    name: 'PropForm',
    component: PropForm
  },
  {
    path: '/admin/prop-type/:id(\\d+)',
    name: 'PropTypeForm',
    component: PropTypeForm
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
