<template>
	<div v-if="teams.length != 0">
    <div v-for="(team, index) in teams">
    <b-card title="team.name"
            :img-src="team.logo_url"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
      <p class="card-text">Tag: {{team.tag}}</p>
      <p class="card-text">last_match_time: {{team.last_match_time}}</p>
      <p class="card-text">Rating: {{team.rating}}</p>
      <p class="card-text">Wins: {{team.wins}}</p>
      <p class="card-text">Losses: {{team.losses}}</p>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div>
</div>
<h2 v-else>Looks so empty</h2>

</template>

<script>
	export default {
    	 name: 'allTeams',
        props: ['vista'],
    	data() {
    		return {
         teams:[],
         mensaje:false
    		}
    	},

      mounted() {
        
      },

      created() {
        this.$http.get('https://api.opendota.com/api/teams')
              .then((response) => {
                  this.teams = response.data;
              })
              .catch((error) => {
                console.log(error);
              })
      },

    	methods: {
    		cambiarVista(vista) {
                this.$emit('cambiarVista', vista);
            }
    	}

    }
</script>