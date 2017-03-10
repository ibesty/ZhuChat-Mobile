import Vue from 'vue'
import store from './vuex/store'
import VueSocketio from 'vue-socket.io' 
import App from './App.vue'
import router from './router'
//import 'normalize.css'
Vue.use(VueSocketio, 'http://192.168.1.2:3000')

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})