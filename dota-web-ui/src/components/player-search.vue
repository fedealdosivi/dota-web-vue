<template>
	<b-card class="text-center">
		<b-card title="Search By Name" bg-variant="dark" text-variant="white">
		  <b-form-input v-model="playerName"
		                type="text"
		                placeholder="Enter the name of the player"></b-form-input>
		                <br>
		                <b-button @click='getPlayer()'>Search</b-button>
      	</b-card>
      	<h3 v-if="loading">LOADING PAGE</h3>
  		<transition name="bounce">
			<div v-if="this.players.lenght<1">
				<h3>Player not found</h3>
			</div>
			<b-card bg-variant="dark" text-variant="white" v-else v-for="p in this.players" :key="p.account_id" class="text-center">
				<b-img right :src="p.avatarfull" alt="Thumbnail" />
				<h4>Name: {{p.personaname}}</h4>
				<h4>Account id: {{p.account_id}}</h4>
				<h4>Last Match: {{p.last_match_time}}</h4>
				<b-button :href="'#/player/'+ p.account_id +'/peers'" variant="primary">Discover Peers</b-button>
	          	<b-button :href="'#/player/'+ p.account_id + '/rmatches/'" variant="primary">See Recent Matches</b-button>
	  	      	<b-button :href="'/#/player/' + p.account_id">See profile</b-button>
	  	      	<b-button :href="'#/player/'+ p.account_id + '/heroes/'" variant="primary">Discover Heroes</b-button>
	  	      	<b-button :href="'#/player/'+ p.account_id + '/words/'" variant="primary">See what he's saying</b-button>
			</b-card>
		</transition>
	</b-card>
</template>

<script>
	import playerService from '../services/playerService';
	export default {
		data() {
			return {
				playerName:'',
				players :[],
				loading:false
			}
		},

		mounted() {

		},

		created() {
			this.getPlayer();
		},

		methods: {

		    getPlayer(){
	    	  this.loading=true;
		      playerService.getPlayerByPersonaname(this.playerName)
		      .then((response) => {
		                      this.players = response.data;
		                      this.loading = false;
		                  })
		                  .catch((error) => {
		                      this.players='';
		                      this.loading=false;
		                  })
		                }
		    }

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