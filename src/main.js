import Vue from 'vue';
import App from './App';
import VueFire from 'vuefire';
import router from './router';
import VueRouter from 'vue-router';
import store from './store'

Vue.use(VueRouter);
Vue.use(VueFire);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});