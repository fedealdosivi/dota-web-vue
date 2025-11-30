// Jest setup file
const Vue = require('vue');
const Buefy = require('buefy');

// Suppress Vue warnings during tests
Vue.config.productionTip = false;
Vue.config.devtools = false;

// Install Buefy globally for tests
Vue.use(Buefy.default);

// Mock Socket.IO
global.io = jest.fn(() => ({
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
  disconnect: jest.fn()
}));