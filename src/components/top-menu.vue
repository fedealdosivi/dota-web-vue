<template>
  <b-navbar class="modern-navbar" fixed-top>
    <template #brand>
      <b-navbar-item tag="router-link" to="/" class="brand-logo">
        <span class="logo-icon">⚔️</span>
        <span class="brand-text">Dota Stats</span>
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item href="/#/player" class="nav-link-custom">
        <span class="nav-icon">👥</span>
        Players
      </b-navbar-item>
      <b-navbar-item href="/#/heroes" class="nav-link-custom">
        <span class="nav-icon">🦸</span>
        Heroes
      </b-navbar-item>
      <b-navbar-item href="/#/teams" class="nav-link-custom">
        <span class="nav-icon">🛡️</span>
        Teams
      </b-navbar-item>
      <b-navbar-item href="/#/chat" class="nav-link-custom chat-link">
        <span class="nav-icon">💬</span>
        Chat
      </b-navbar-item>
    </template>
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
  background: var(--dota-gradient-dark) !important;
  padding: 1rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid var(--dota-primary) !important;
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
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 500;
  padding: 0.5rem 1rem !important;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link-custom:hover {
  background: rgba(224, 49, 49, 0.2);
  color: white !important;
  transform: translateY(-2px);
}

.nav-link-custom.is-active {
  background: rgba(224, 49, 49, 0.3);
  color: white !important;
}

.nav-icon {
  font-size: 1.2rem;
}

.chat-link {
  background: rgba(224, 49, 49, 0.15);
  border: 1px solid var(--dota-primary);
}

.chat-link:hover {
  background: rgba(224, 49, 49, 0.3);
  border-color: var(--dota-primary-light);
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
