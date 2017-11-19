<template>
	<h1>hola</h1>
</template>
<script>
    import playerService from '../services/playerService';
    export default {
     name: 'playerPeers',
     props: ['vista'],
     data() {
      return {   			
       player :{},
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
     this.getPlayer();
   }
  },	

  created() {
   this.getPlayer();
  },

  methods: {

    getPlayer(){
      playerService.getPlayerById(this.id)
      .then((response) => {
                      this.player = response.data;
                  })
                  .catch((error) => {
                      this.player='';
                  })
                }
    },


  }
  </script>