<template>
  <h3>hola</h3>
</template>

<script>
export default {
    data() {
      return {
        
      }
    },

    methods: {
      
    },

    computed:{

    },

    created() {
 
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