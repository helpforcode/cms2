import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
// import VueStorage from "vue-ls";
import store from './store'
// import config from '@/defaultSettings'
import vuetify from './plugins/vuetify'
import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/nutui.css'
import '@/permission'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
NutUI.install(Vue)

Vue.config.productionTip = false

// Vue.use(VueStorage, config.storageOptions)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
