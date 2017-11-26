<template>
	<b-card class="text-center">
	    <h3 v-if="heroes.lenght<1">Nothing here</h3>
	    <b-card v-else v-for="h in this.heroes" :key="h.id" bg-variant="dark" text-variant="white">
	    	<h4>ID: {{h.id}}</h4>
	    	<h4>NAME :{{h.localized_name}}</h4>
	    </b-card>
  </b-card>
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
      heroeService.getAllHeroes()
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