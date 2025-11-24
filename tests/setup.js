// Jest setup file
const Vue = require('vue');
const BootstrapVue = require('bootstrap-vue');

// Suppress Vue warnings during tests
Vue.config.productionTip = false;
Vue.config.devtools = false;

// Install Bootstrap Vue globally for tests
Vue.use(BootstrapVue);

// Mock Socket.IO
global.io = jest.fn(() => ({
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
  disconnect: jest.fn()
}));