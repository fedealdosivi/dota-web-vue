<template>
	 <div>
    <b-card title="Search a dota player">
        
    <b-form-input v-model="idplayer"
                  type="text"
                  placeholder="Enter the id of the player"></b-form-input>
                  <br>
                  <b-button :href="'/#/player/' + idplayer">Search</b-button>
    </b-card>
  </div>


</template>

<script>
	export default {
    	 name: 'homeMenu',
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
    		cambiarVista(vista) {
                this.$emit('cambiarVista', vista);
            }
    	}

    }
</script>