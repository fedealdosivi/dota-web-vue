<template>
	 <div>
    <b-card title="Search a dota player">
        
    <b-form-input v-model="username"
                  type="text"
                  placeholder="Enter the id"></b-form-input>
                  <br>
                  <b-button>Search</b-button>
    </b-card>
  </div>


</template>

<script>
	export default {
    	 name: 'homeMenu',
        props: ['vista'],
    	data() {
    		return {
         username: '',
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