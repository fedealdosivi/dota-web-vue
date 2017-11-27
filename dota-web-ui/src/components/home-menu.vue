<template>
	 <div>
    <b-card class="text-center">
      <b-card title="Search By Id">
  
      <b-form-input v-model="idplayer"
                    type="text"
                    placeholder="Enter the id of the player"></b-form-input>
                    <br>
                    <b-button :href="'/#/player/' + idplayer">Search</b-button>
      </b-card>
    </b-card>
  </div>


</template>

<script>
	export default {
          props: ['vista'],
    	data() {
    		return {
          idplayer: '',
          mensaje:false
    		}
    	},

      mounted() {
        
      },

      created() {

      },

    	methods: {

    	}

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