<template>


<h3 v-if="!players.lenght">empty</h3>
<div v-else>
        <b-card v-for="(p,index) in players" bg-variant="dark" text-variant="white">
          <h3 class="Card Title">{{p.profile.personaname}}</h3>
          <p class="card-text">Steam ID: {{p.profile.steamid}}</p>
          <p class="card-text">MMR points: {{p.mmr_estimate.estimate}}</p>
          <b-img right src="this.player.profile.avatarfull" alt="right image" />
          <p>{{p.profile.avatarfull}}</p>
          <b-button :href="'#/player/'+ p.profile.account_id +'/peers'" variant="primary">Discover Peers</b-button>
          <b-button :href="'#/player/'+ p.profile.account_id + '/rmatches/'" variant="primary">See Recent Matches</b-button>
        </b-card>
</div>
      

</template>

<script>

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

		},

		methods: {

		    getPlayer(){
		      playerService.getPlayerByPersonaname(this.name)
		      .then((response) => {
		                      this.player = response.data;
		                  })
		                  .catch((error) => {
		                      this.player='';
		                  })
		                }
		    }

		}
</script>