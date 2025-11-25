// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App'
import VueRouter from 'vue-router'
import router from './utils/router'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './assets/dota-theme.css'

import axios from 'axios'

import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

// Socket.IO configuration
// In development: connect to separate socket server on port 3000
// In production: connect to the same server (no port needed)
const socketUrl = process.env.NODE_ENV === 'production'
  ? window.location.origin  // Production: same host and port
  : 'http://localhost:3000'; // Development: separate socket server

export const SocketInstance = socketio(socketUrl);
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance
}));
Vue.use(Buefy);
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
