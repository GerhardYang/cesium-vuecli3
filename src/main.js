import Vue from 'vue'
import App from './App.vue'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import L from 'leaflet';
import '@supermap/iclient-leaflet';
Vue.use(L);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')