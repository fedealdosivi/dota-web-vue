<template>
  <div class="hello box">
    <h1 class="title">{{ msg }}</h1>
    <h2 class="subtitle">Essential Links</h2>
    <div class="content">
      <ul>
        <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
        <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
        <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
        <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
        <br>
        <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
      </ul>
      <h2 class="subtitle">Ecosystem</h2>
      <ul>
        <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
        <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
        <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
        <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
.hello {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
}

.title {
  color: #7957d5;
}

.subtitle {
  color: #7a7a7a;
  margin-top: 1.5rem;
}

.content ul {
  list-style-type: none;
  padding: 0;
}

.content li {
  display: inline-block;
  margin: 0 10px;
}

.content a {
  color: #7957d5;
  text-decoration: none;
  transition: color 0.3s ease;
}

.content a:hover {
  color: #8e44ad;
}
</style>
