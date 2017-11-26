<template>
  	<div v-if="players!=null">
		<b-table dark striped hover :items="players"></b-table>
	</div>
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
			this.players=this.getPlayer();
		},

		methods: {

		    getPlayer(){
		      playerService.getPlayerByPersonaname(this.name)
		      .then((response) => {
		                      this.players = response.data;
		                  })
		                  .catch((error) => {
		                      this.players=null;
		                      this.mensaje=true;
		                  })
		                }
		    }

		}
</script>