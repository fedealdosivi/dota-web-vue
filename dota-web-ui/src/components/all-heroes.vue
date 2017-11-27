<template>
	<div>
    <b-card class="text-center">
      <h3 v-if="heroes.lenght<1">Nothing here</h3>
          <b-card v-else v-for="h in this.heroes" :key="h.id" bg-variant="dark" text-variant="white">
            <h4>{{h.localized_name}}</h4>
            <h4>Attribute: {{h.primary_attr}}</h4>
            <h4>Attack Type: {{h.attack_type}}</h4>
            <h4>Roles: {{h.roles}}</h4>
            <b-button :href="'#/heroes/'+ h.id + '/matches/'" variant="primary">Discover Matches</b-button>
            <b-button :href="'#/heroes/'+ h.id + '/players/'" variant="primary">Players who used this heroe</b-button>
            <b-button :href="'#/heroes/'+ h.id + '/matchups/'" variant="primary">Matchups</b-button>
            <b-button :href="'#/heroes/'+ h.id + '/rankings/'" variant="primary">Rankings</b-button>
            <b-button :href="'#/heroes/'+ h.id + '/durations/'" variant="primary">Durations</b-button>     
          </b-card>
    </b-card>
</div>
</template>

<script>
	import heroeService from '../services/heroeService';
    export default {
     name: 'playerPeers',
     props: ['vista'],
     data() {
      return {   			
       	heroes:[],
 		mensaje:false
    }
  }, 	

  created() {
   this.getHeroes();
  },

  methods: {

    getHeroes(){
      heroeService.getHeroStats()
      .then((response) => {
                      this.heroes = response.data;
                  })
                  .catch((error) => {
                      this.heroes=null;
                  })
                }
    },


  }
</script>