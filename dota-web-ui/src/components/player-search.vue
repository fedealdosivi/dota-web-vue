<template>
	<b-card class="text-center">
		<b-card title="Search By Name">
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
		<b-card v-else v-for="p in this.players" :key="p.account_id" class="text-center">
			Name: {{p.personaname}}
			Account id: {{p.account_id}}
			Last Match: {{p.last_match_time}}
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