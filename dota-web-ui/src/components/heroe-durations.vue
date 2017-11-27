<template>
	<b-card class="text-center">
      <h3 v-if="loading">LOADING PAGE</h3>
	    <h3 v-if="durations.lenght<1">Looks so empty</h3>
	    <b-table v-else dark :items="durations"></b-table>
  </b-card>
</template>

<script>
	import heroeService from '../services/heroeService';
    export default {
     data() {
      return {   			
   	    durations:[],
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
     this.getDurations(this.id);
   }
  },	

  created() {
   this.getDurations(this.id);
  },

  methods: {

    getDurations(){
      this.loading=true;
      heroeService.getDurationHeroeById(this.id)
      .then((response) => {
                      this.durations = response.data;
                  })
                  .catch((error) => {
                      this.durations=null;
                  })
                  this.loading=false;
                }
    },
  }
</script>