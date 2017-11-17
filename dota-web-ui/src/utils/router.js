import VueRouter from 'vue-router'
import homeMenu from '../components/home-menu.vue'
import allTeams from '../components/all-teams.vue'
import playerProfile from '../components/player-profile.vue'

export default new VueRouter({
  routes: [
      { path: '/', component: homeMenu },
      {path: "/teams/", component: allTeams},
      {path: "/player/:id", component: playerProfile}
	]
});