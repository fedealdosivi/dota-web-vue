import VueRouter from 'vue-router'
import homeMenu from '../components/home-menu.vue'
import allTeams from '../components/all-teams.vue'
import playerSearch from '../components/player-search.vue'
import playerProfile from '../components/player-profile.vue'
import playerPeers from '../components/player-peers.vue'
import playerRecent from '../components/player-recent.vue'


export default new VueRouter({
  routes: [
      {path: '/', component: homeMenu },
      {path: "/teams/", component: allTeams},
      {path: "/player/", component: playerSearch},   
      {path: "/player/:id", component: playerProfile},
      {path: "/player/:id/peers", component: playerPeers},
      {path: "/player/:id/rmatches", component: playerRecent}
	]
});