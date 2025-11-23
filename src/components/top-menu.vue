<template>
  <b-navbar toggleable="md" class="modern-navbar" sticky>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="/#/" class="brand-logo">
      <span class="logo-icon">⚔️</span>
      <span class="brand-text">Dota Stats</span>
    </b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/#/player" class="nav-link-custom">
          <span class="nav-icon">👥</span>
          Players
        </b-nav-item>
        <b-nav-item href="/#/heroes" class="nav-link-custom">
          <span class="nav-icon">🦸</span>
          Heroes
        </b-nav-item>
        <b-nav-item href="/#/teams" class="nav-link-custom">
          <span class="nav-icon">🛡️</span>
          Teams
        </b-nav-item>
        <b-nav-item href="/#/chat" class="nav-link-custom chat-link">
          <span class="nav-icon">💬</span>
          Chat
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
    export default {
    	name: 'topMenu',
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

    	}

    }
</script>

<style scoped>
.modern-navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  padding: 1rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.brand-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: white !important;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;
}

.brand-logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  font-size: 1.8rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.brand-text {
  background: linear-gradient(to right, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-link-custom {
  margin: 0 0.5rem;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link-custom a {
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 500;
  padding: 0.5rem 1rem !important;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.nav-link-custom a:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white !important;
  transform: translateY(-2px);
}

.nav-link-custom.active a {
  background: rgba(255, 255, 255, 0.2);
  color: white !important;
}

.nav-icon {
  font-size: 1.2rem;
}

.chat-link a {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.chat-link a:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 768px) {
  .modern-navbar {
    padding: 0.75rem 1rem;
  }

  .nav-link-custom {
    margin: 0.25rem 0;
  }
}
</style>
