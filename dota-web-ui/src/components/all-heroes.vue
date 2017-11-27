<template>
	<div>
    <b-card class="text-center">
      <h3 v-if="loading">LOADING PAGE</h3>
      <h3 v-if="heroes.lenght<1">Nothing here</h3>
      <div v-else>
        <transition-group name="bounce">
          <b-card v-for="h in this.heroes" :key="h.id" bg-variant="dark" text-variant="white">
            <h4>{{h.localized_name}}</h4>
            <h4>Attribute: {{h.primary_attr}}</h4>
            <h4>Attack Type: {{h.attack_type}}</h4>
            <h4>Roles: {{h.roles}}</h4>
            <b-button :href="'#/heroes/'+ h.id + '/matches/'" variant="primary">Discover Matches</b-button>
            <b-button :href="'#/heroes/'+ h.id + '/players/'" variant="primary">Players who used this heroe</b-button>
            <b-button :href="'#/heroes/'+ h.id + '/rankings/'" variant="primary">Rankings</b-button>
            <b-button :href="'#/heroes/'+ h.id + '/durations/'" variant="primary">Durations</b-button>     
          </b-card>
        </transition-group>
      </div>
    </b-card>
</div>
</template>

<script>
	import heroeService from '../services/heroeService';
    export default {
     data() {
      return {   			
          heroes:[],
          loading:false
    }
  }, 	

  created() {
   this.getHeroes();
  },

  methods: {

    getHeroes(){
      this.loading=true;
      heroeService.getHeroStats()
      .then((response) => {
                      this.heroes = response.data;
                      this.loading=false;
                  })
                  .catch((error) => {
                      this.heroes=null;
                      this.loading=false;
                  })
                }
    },


  }
</script>
<style>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>