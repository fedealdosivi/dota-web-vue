<template>
	<b-card class="text-center">
	    <h3 v-if="heroes.lenght<1">Looks like you need to start playing</h3>
	    <b-card v-else v-for="h in this.heroes" :key="h.hero_id" bg-variant="dark" text-variant="white">
	    	<h4>ID: {{h.hero_id}}</h4>
	    	<h4>GAMES: {{h.games}}</h4>
	    	<h4>WINS :{{h.win}}</h4>
	    	<h4>LAST PLAYED: {{h.last_played}}</h4>
	    </b-card>
  </b-card>
</template>

<script>
	import playerService from '../services/playerService';
    export default {
     name: 'playerPeers',
     props: ['vista'],
     data() {
      return {   			
       	heroes:[],
 		mensaje:false
    }
  }, 

  computed:{
    params() {
      return this.$route.params;
    },
    id() {
      return this.$route.params.id;
    }

  },

  watch: {
   '$route.params.id': function() {
     this.id = this.$route.params.id;
     this.getHeroes(this.id);
   }
  },	

  created() {
   this.getHeroes(this.id);
  },

  methods: {

    getHeroes(){
      playerService.getWinLosesByPlayerIdPerHeroe(this.id)
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