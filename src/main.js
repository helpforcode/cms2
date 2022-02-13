import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import VueStorage from "vue-ls";
import store from './store'
import config from '@/defaultSettings'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(VueStorage, config.storageOptions)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
