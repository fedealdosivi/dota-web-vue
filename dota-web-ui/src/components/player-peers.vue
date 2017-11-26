<template>
  <b-card class="text-center">
    <h3 v-if="peers.lenght<1">Looks like you are alone in this world</h3>
    <b-card v-else v-for="p in this.peers" :key="p.account_id" bg-variant="dark" text-variant="white">
      <b-img right :src="p.avatarfull" alt="Thumbnail" />
      <h4>Name: {{p.personaname}}</h4>
      <h4>Games: {{p.games}}</h4>
      <h4>Wins: {{p.win}}</h4>
      <h4>Las played: {{p.last_played}}</h4>
      <b-button :href="'#/player/'+ p.account_id +'/peers'" variant="primary">Discover Peers</b-button>
      <b-button :href="'#/player/'+ p.account_id + '/rmatches/'" variant="primary">See Recent Matches</b-button>
    </b-card>
  </b-card>
</template>
<script>
    import playerService from '../services/playerService';
    export default {
     name: 'playerPeers',
     props: ['vista'],
     data() {
      return {   			
       	peers:[],
 		mensaje:false
    }
  }, 

  computed:{
    params() {
      return this.$route.params;
    },
    id() {
      return this.$route.params.id;
    }

  },

  watch: {
   '$route.params.id': function() {
     this.id = this.$route.params.id;
     this.getPeers(this.id);
   }
  },	

  created() {
   this.getPeers(this.id);
  },

  methods: {

    getPeers(){
      playerService.getPeersByPlayerId(this.id)
      .then((response) => {
                      this.peers = response.data;
                  })
                  .catch((error) => {
                      this.peers=null;
                  })
                }
    },


  }
  </script>