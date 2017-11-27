<template>
  <b-card class="text-center">
    <h3 v-if="words==null">Looks so empty</h3>
    <h3 v-if="loading">LOADING PAGE</h3>
    <div v-else>
      <transition name="bounce">
        <b-card bg-variant="dark" text-variant="white">
    		{{words.my_word_counts}}
        </b-card>
      </transition>
    </div>
  </b-card>
</template>

<script>
	import playerService from '../services/playerService';
    export default {
     data() {
      return {   			
        words:'',
        loading:false
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
      this.loading=true
      playerService.getWordsByPlayerId(this.id)
      .then((response) => {
                      this.words = response.data;
                      this.loading=false;
                  })
                  .catch((error) => {
                      this.words=null;
                      this.loading=false;
                  })
                }
    },


  }
</script>

<style>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>