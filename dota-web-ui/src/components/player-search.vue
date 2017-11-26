<template>
	<b-card class="text-center">
		
		<div v-if="this.players.lenght<1">
			<h3>no hay nada</h3>
		</div>
		<b-card v-else v-for="p in this.players" :key="p.account_id" class="text-center">
			{{p.personaname}}
		</b-card>
	</b-card>
</template>

<script>
	import playerService from '../services/playerService';
	export default {
		data() {
			return {
				name: 'peron',
				players :[],
				mensaje:false
			}
		},

		mounted() {

		},

		created() {
			this.getPlayer();
		},

		methods: {

		    getPlayer(){
		      playerService.getPlayerByPersonaname(this.name)
		      .then((response) => {
		                      this.players = response.data;
		                  })
		                  .catch((error) => {
		                      this.players='';
		                      this.mensaje=true;
		                  })
		                }
		    }

		}
</script>