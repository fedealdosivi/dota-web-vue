<template>
<div v-if="player!=null">
    <b-card title="player.personaname"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
      <p class="card-text">Name: </p>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
</div>
<h2 v-else>Looks so empty</h2>

</template>

<script>
	export default {
    	name: 'playerProfile',
        props: ['vista'],
    	data() {
    		return {
    			
    			id     : '',
    			player :'',
     			mensaje:false
    		}
    	},

		mounted() {

		},

		watch: {
			'$route.params.id': function() {
			this.id = this.$route.params.id;
			this.getPlayer();
			}
		},	

		created() {
			this.getPlayer();
		},

    	methods: {

    		getPlayer(){
    		this.$http.get('https://api.opendota.com/api/players/'+ this.id)
              .then((response) => {
                  this.player = response.data.profile;
              })
              .catch((error) => {
                console.log(error);
              })
    		},


    		cambiarVista(vista) {
                this.$emit('cambiarVista', vista);
            }
    	}

    }
</script>