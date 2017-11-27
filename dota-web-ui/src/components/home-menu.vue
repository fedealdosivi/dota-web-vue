<template>
  <div>
    <transition name="bounce">
        <h1>HOLA</h1>
    </transition>
  </div>
</template>

<script>
	export default {
    	data() {
    		return {
          idplayer: '',
          loading:false
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

    body{
      background-color: black;
    }
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