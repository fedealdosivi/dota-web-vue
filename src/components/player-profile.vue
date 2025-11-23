<template>
  <div class="profile-container">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading player profile...</p>
    </div>

    <div v-else-if="player==null || !player.profile" class="empty-state">
      <div class="empty-icon">😕</div>
      <h3>Player not found</h3>
      <p>The player profile could not be loaded</p>
    </div>

    <transition name="fade-slide" v-else>
      <div class="profile-content">
        <!-- Player Header Card -->
        <b-card class="profile-header-card">
          <div class="profile-header">
            <b-img
              :src="player.profile.avatarfull"
              alt="Avatar"
              class="profile-avatar"
            />
            <div class="profile-info">
              <h2 class="player-name">
                {{ player.profile.personaname }}
                <span v-if="player.profile.loccountrycode" class="country-badge">
                  {{ player.profile.loccountrycode }}
                </span>
              </h2>
              <p class="player-id">Account ID: {{ player.profile.account_id }}</p>
            </div>
          </div>
        </b-card>

        <!-- Stats Grid -->
        <div class="stats-grid">
          <b-card class="stat-card" v-if="player.rank_tier">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <div class="stat-label">Rank Tier</div>
              <div class="stat-value">{{ player.rank_tier }}</div>
            </div>
          </b-card>

          <b-card class="stat-card" v-if="player.solo_competitive_rank">
            <div class="stat-icon">⭐</div>
            <div class="stat-content">
              <div class="stat-label">Solo Rank</div>
              <div class="stat-value">{{ player.solo_competitive_rank }}</div>
            </div>
          </b-card>

          <b-card class="stat-card" v-if="player.mmr_estimate && player.mmr_estimate.estimate">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
              <div class="stat-label">MMR Estimate</div>
              <div class="stat-value">{{ player.mmr_estimate.estimate }}</div>
            </div>
          </b-card>

          <b-card class="stat-card" v-if="player.competitive_rank">
            <div class="stat-icon">🎯</div>
            <div class="stat-content">
              <div class="stat-label">Competitive Rank</div>
              <div class="stat-value">{{ player.competitive_rank }}</div>
            </div>
          </b-card>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <b-button
            :href="'#/player/'+ player.profile.account_id + '/heroes/'"
            class="action-btn"
          >
            <span class="btn-icon">🦸</span>
            Hero Statistics
          </b-button>
          <b-button
            :href="'#/player/'+ player.profile.account_id + '/rmatches/'"
            class="action-btn"
          >
            <span class="btn-icon">📋</span>
            Recent Matches
          </b-button>
          <b-button
            :href="'#/player/'+ player.profile.account_id +'/peers'"
            class="action-btn"
          >
            <span class="btn-icon">👥</span>
            Discover Peers
          </b-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
    import playerService from '../services/playerService';
    export default {
     data() {
      return {
        player: null,
        loading: false
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
     this.getPlayer();
   }
  },

  created() {
    this.getPlayer();
  },

  methods: {
    getPlayer(){
      this.loading = true;
      playerService.getPlayerById(this.id)
      .then((response) => {
        this.player = response.data;
        this.loading = false;
      })
      .catch(() => {
        this.player = null;
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.loading-state {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: #f8f9fa;
  border-radius: 16px;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-header-card {
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 16px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.profile-info {
  flex: 1;
}

.player-name {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.country-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.player-id {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-card .card-body {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
}

.stat-icon {
  font-size: 3rem;
  line-height: 1;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-btn {
  padding: 1rem 1.5rem;
  border-radius: 12px;
  background: white;
  border: 2px solid #e9ecef;
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-icon {
  font-size: 1.3rem;
}

.fade-slide-enter-active {
  transition: all 0.4s ease-out;
}

.fade-slide-leave-active {
  transition: all 0.3s ease-in;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 768px) {
  .profile-container {
    padding: 1rem;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .player-name {
    font-size: 2rem;
    flex-direction: column;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
