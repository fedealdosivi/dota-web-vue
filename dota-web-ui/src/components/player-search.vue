<template>
	<b-card class="text-center">
		<b-card title="Search By Name" bg-variant="dark" text-variant="white">
		  <b-form-input v-model="playerName"
		                type="text"
		                placeholder="Enter the name of the player"></b-form-input>
		                <br>
		                <b-button @click='getPlayer()'>Search</b-button>
      	</b-card>
      	<h3 v-if="loading">LOADING</h3>
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
		</b-card>
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
	    	  this.mensaje=true;
		      playerService.getPlayerByPersonaname(this.playerName)
		      .then((response) => {
		                      this.players = response.data;
		                  })
		                  .catch((error) => {
		                      this.players='';
		                  })
		                }
		    }

		}
</script>