<template>
<b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="/#/">Dota Stats</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item href="/#/teams">Link</b-nav-item>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</template>

<script>
    export default {
    	name: 'topMenu',
        props: ['vista'],
    	data() {
    		return {
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

<style src="vue-material/dist/vue-material.css"></style>
