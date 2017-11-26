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