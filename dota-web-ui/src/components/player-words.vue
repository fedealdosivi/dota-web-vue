<template>
  <b-card class="text-center">
  	<b-button :href="'#/player/'+ this.id +'/peers'" variant="primary">Discover Peers</b-button>
  	<b-button :href="'#/player/'+ this.id + '/rmatches/'" variant="primary">See Recent Matches</b-button>
  	<b-button :href="'#/player/'+ id + '/heroes/'" variant="primary">Discover Heroes</b-button>
    <h3 v-if="words==null">Looks so empty</h3>
    <b-card v-else bg-variant="dark" text-variant="white">
		{{words.my_word_counts}}
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
       	words:'',
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
     this.getWords(this.id);
   }
  },	

  created() {
   this.getWords(this.id);
  },

  methods: {

    getWords(){
      playerService.getWordsByPlayerId(this.id)
      .then((response) => {
                      this.words = response.data;
                  })
                  .catch((error) => {
                      this.words=null;
                  })
                }
    },


  }
</script>