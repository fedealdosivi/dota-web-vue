<template>
  <b-card class="text-center">
  	<h3 v-if="this.matches.lenght<1">Looks like you are alone in this world</h3>
    <b-card v-else v-for="m in this.matches" :key="m.match_id" bg-variant="dark" text-variant="white">
      <h4>ID: {{m.match_id}}</h4>
      <h4>WIN: {{m.radiant_win}}</h4>
      <h4>KILLS: {{m.kills}}</h4>
      <h4>DEATHS: {{m.deaths}}</h4>
      <h4>ASSISTS: {{m.assists}}</h4>
      <h4>GAME MODE: {{m.game_mode}}</h4>
      <h4>LOBBY TYPE: {{m.lobby_type}}</h4>
      <h4>PARTY SIZE: {{m.party_size}}</h4>
      <h4>DURATION: {{m.duration}}</h4>
      <h4>CLUSTER: {{m.cluster}}</h4>
      <h4>LEAVER: {{m.leaver_status}}</h4>
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
       	matches:[],
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
     this.matches=this.getPeers();
   }
  },	

  created() {
   this.matches=this.getPeers();
  },

  methods: {

    getPeers(){
      playerService.getRecentMatchesByPlayerId(this.id)
      .then((response) => {
                      this.matches = response.data;
                  })
                  .catch((error) => {
                      this.matches='';
                  })
                }
    },


  }
  </script>