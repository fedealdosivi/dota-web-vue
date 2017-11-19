<template>
	<div v-if="matches!=null">
		<b-table dark striped hover :items="matches"></b-table>
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
                      this.matches=null;
                  })
                }
    },


  }
  </script>