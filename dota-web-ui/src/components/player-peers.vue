<template>
	<div v-if="peers!=null">
		<b-table dark striped hover :items="peers"></b-table>
	</div>
	<h2 v-else>Looks like you are alone in this world</h2>
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
     this.peers=this.getPeers();
   }
  },	

  created() {
   this.peers=this.getPeers();
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