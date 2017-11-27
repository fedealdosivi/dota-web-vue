import VueRouter from 'vue-router'
import homeMenu from '../components/home-menu.vue'
import playerSearch from '../components/player-search.vue'
import playerProfile from '../components/player-profile.vue'
import playerPeers from '../components/player-peers.vue'
import playerRecent from '../components/player-recent.vue'
import playerHeroes from '../components/player-heroes.vue'
import playerWords from '../components/player-words.vue'
import allHeroes from '../components/all-heroes.vue'
import heroeMatches from '../components/heroe-matches.vue'
import heroePlayers from '../components/heroe-players.vue'
import heroeMatchups from '../components/heroe-matchups.vue'
import heroesRankings from '../components/heroes-rankings.vue'
import heroeDurations from '../components/heroe-durations.vue'


export default new VueRouter({
  routes: [
      {path: '/', component: homeMenu },
      {path: "/player/", component: playerSearch},   
      {path: "/player/:id", component: playerProfile},
      {path: "/player/:id/peers", component: playerPeers},
      {path: "/player/:id/rmatches", component: playerRecent},
      {path: "/player/:id/heroes", component: playerHeroes},
      {path: "/player/:id/words", component: playerWords},
      {path: "/heroes/", component: allHeroes},
      {path: "/heroes/:id/matches", component: heroeMatches},
      {path: "/heroes/:id/players", component: heroePlayers},
      {path: "/heroes/:id/matchups", component: heroeMatchups},
      {path: "/heroes/:id/rankings", component: heroesRankings},
      {path: "/heroes/:id/durations", component: heroeDurations}
	]
});