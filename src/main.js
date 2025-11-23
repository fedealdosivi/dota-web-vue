// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App'
import VueRouter from 'vue-router'
import router from './utils/router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
// Use window.location.hostname to automatically use the correct IP
const socketUrl = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : `http://${window.location.hostname}:3000`;
export const SocketInstance = socketio(socketUrl);
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance
}));
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.prototype.$http = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	el: '#app',
	template: '<App/>',
	components: { App }
})
