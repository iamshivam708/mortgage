import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import VueRouter from 'vue-router';
import Router from './routes';
Vue.use(VueRouter);
import VueAxios from 'vue-axios';
import axios from 'axios'
import VueSession from 'vue-session'
Vue.use(VueSession)

Vue.use(VueAxios,axios);

const router = new VueRouter({
  routes: Router,
  mode: 'history'
})

new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})
