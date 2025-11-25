<template>
  <div class="recent-matches-container">
    <div class="matches-header">
      <h1 class="page-title">
        <span class="title-icon">📋</span>
        Recent Matches
      </h1>
      <p class="subtitle">Latest match history and performance</p>
    </div>

    <!-- Stats Summary -->
    <div v-if="matches && matches.length > 0" class="stats-summary">
      <div class="summary-card">
        <div class="summary-icon">🎮</div>
        <div class="summary-content">
          <div class="summary-label">Total Matches</div>
          <div class="summary-value">{{ matches.length }}</div>
        </div>
      </div>
      <div class="summary-card win">
        <div class="summary-icon">✅</div>
        <div class="summary-content">
          <div class="summary-label">Wins</div>
          <div class="summary-value">{{ winCount }}</div>
        </div>
      </div>
      <div class="summary-card loss">
        <div class="summary-icon">❌</div>
        <div class="summary-content">
          <div class="summary-label">Losses</div>
          <div class="summary-value">{{ lossCount }}</div>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon">📊</div>
        <div class="summary-content">
          <div class="summary-label">Win Rate</div>
          <div class="summary-value">{{ winRate }}%</div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading recent matches...</p>
    </div>

    <div v-else-if="!matches || matches.length === 0" class="empty-state">
      <div class="empty-icon">🎯</div>
      <h3>No recent matches found</h3>
      <p>This player hasn't played recently or match data is unavailable</p>
    </div>

    <transition-group v-else name="fade-slide" tag="div" class="matches-grid">
      <div
        v-for="m in matches"
        :key="m.match_id"
        :class="['box', 'match-card', m.radiant_win ? 'match-win' : 'match-loss']"
      >
        <!-- Match Result Badge -->
        <div class="match-result-badge">
          <span v-if="m.radiant_win" class="result-text win">Victory</span>
          <span v-else class="result-text loss">Defeat</span>
        </div>

        <!-- Match Info Header -->
        <div class="match-header">
          <div class="match-id">
            <span class="id-label">Match ID</span>
            <span class="id-value">{{ m.match_id }}</span>
          </div>
          <div class="match-time">
            <span class="time-icon">🕐</span>
            {{ formatDuration(m.duration) }}
          </div>
        </div>

        <!-- KDA Stats -->
        <div class="kda-section">
          <div class="kda-stats">
            <div class="stat-item kills">
              <div class="stat-number">{{ m.kills }}</div>
              <div class="stat-label">Kills</div>
            </div>
            <div class="stat-divider">/</div>
            <div class="stat-item deaths">
              <div class="stat-number">{{ m.deaths }}</div>
              <div class="stat-label">Deaths</div>
            </div>
            <div class="stat-divider">/</div>
            <div class="stat-item assists">
              <div class="stat-number">{{ m.assists }}</div>
              <div class="stat-label">Assists</div>
            </div>
          </div>
          <div class="kda-ratio">
            <span class="kda-label">KDA:</span>
            <span class="kda-value">{{ calculateKDA(m.kills, m.deaths, m.assists) }}</span>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="match-details">
          <div class="detail-row">
            <span class="detail-label">
              <span class="detail-icon">👥</span>
              Party Size
            </span>
            <span class="detail-value">{{ m.party_size || 1 }}</span>
          </div>
          <div class="detail-row" v-if="m.average_rank">
            <span class="detail-label">
              <span class="detail-icon">⭐</span>
              Avg Rank
            </span>
            <span class="detail-value">{{ m.average_rank }}</span>
          </div>
          <div class="detail-row" v-if="m.leaver_status > 0">
            <span class="detail-label">
              <span class="detail-icon">⚠️</span>
              Status
            </span>
            <span class="detail-value abandon">Abandoned</span>
          </div>
        </div>

        <!-- Match Details Button -->
        <b-button tag="a" :href="'/#/matches/' + m.match_id" type="is-light" class="details-btn">
          <span class="btn-icon">🔍</span>
          View Match Details
        </b-button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import playerService from '../services/playerService';

export default {
  data() {
    return {
      matches: [],
      loading: false
    }
  },

  computed: {
    params() {
      return this.$route.params;
    },
    id() {
      return this.$route.params.id;
    },
    winCount() {
      return this.matches.filter(m => m.radiant_win).length;
    },
    lossCount() {
      return this.matches.filter(m => !m.radiant_win).length;
    },
    winRate() {
      if (this.matches.length === 0) return 0;
      return Math.round((this.winCount / this.matches.length) * 100);
    }
  },

  watch: {
    '$route.params.id': function() {
      this.id = this.$route.params.id;
      this.getMatches();
    }
  },

  created() {
    this.getMatches();
  },

  methods: {
    getMatches() {
      this.loading = true;
      playerService.getRecentMatchesByPlayerId(this.id)
        .then((response) => {
          this.matches = response.data;
          this.loading = false;
        })
        .catch(() => {
          this.matches = [];
          this.loading = false;
        })
    },

    formatDuration(seconds) {
      if (!seconds || seconds === 0) return 'N/A';
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    },

    calculateKDA(kills, deaths, assists) {
      if (deaths === 0) {
        return ((kills + assists) || 0).toFixed(2);
      }
      return ((kills + assists) / deaths).toFixed(2);
    }
  }
}
</script>

<style scoped>
.recent-matches-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.matches-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #7957d5 0%, #8e44ad 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-icon {
  font-size: 2.5rem;
}

.subtitle {
  color: #6c757d;
  font-size: 1.1rem;
}

.stats-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: all 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.summary-card.win {
  background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
  color: white;
}

.summary-card.loss {
  background: linear-gradient(135deg, #d63031 0%, #ff7675 100%);
  color: white;
}

.summary-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.summary-content {
  flex: 1;
}

.summary-label {
  font-size: 0.85rem;
  opacity: 0.9;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-card.win .summary-label,
.summary-card.loss .summary-label {
  color: rgba(255, 255, 255, 0.9);
}

.summary-value {
  font-size: 2rem;
  font-weight: 800;
  margin-top: 0.25rem;
}

.loading-state {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #7957d5;
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

.matches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.match-card {
  position: relative;
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
}

.match-card.match-win {
  border-left: 6px solid #00b894;
}

.match-card.match-loss {
  border-left: 6px solid #d63031;
}

.match-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.match-result-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
  z-index: 10;
}

.result-text.win {
  background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.result-text.loss {
  background: linear-gradient(135deg, #d63031 0%, #ff7675 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-right: 100px;
}

.match-id {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.id-label {
  font-size: 0.75rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.id-value {
  font-size: 1rem;
  font-weight: 700;
  color: #2c3e50;
}

.match-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #6c757d;
}

.time-icon {
  font-size: 1.2rem;
}

.kda-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.kda-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
}

.stat-item.kills .stat-number {
  color: #00b894;
}

.stat-item.deaths .stat-number {
  color: #d63031;
}

.stat-item.assists .stat-number {
  color: #7957d5;
}

.stat-label {
  font-size: 0.75rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
}

.stat-divider {
  font-size: 1.5rem;
  color: #dee2e6;
  font-weight: 300;
}

.kda-ratio {
  text-align: center;
  padding-top: 1rem;
  border-top: 2px solid #e9ecef;
}

.kda-label {
  font-size: 0.9rem;
  color: #6c757d;
  margin-right: 0.5rem;
}

.kda-value {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #7957d5 0%, #8e44ad 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.match-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.detail-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.detail-icon {
  font-size: 1.1rem;
}

.detail-value {
  font-weight: 700;
  color: #2c3e50;
}

.detail-value.abandon {
  color: #d63031;
}

.details-btn {
  width: 100%;
  padding: 0.875rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
}

.details-btn:hover {
  background: linear-gradient(135deg, #7957d5 0%, #8e44ad 100%) !important;
  border-color: transparent !important;
  color: white !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(121, 87, 213, 0.4);
}

.btn-icon {
  font-size: 1.2rem;
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
  .recent-matches-container {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .matches-grid {
    grid-template-columns: 1fr;
  }

  .stats-summary {
    grid-template-columns: repeat(2, 1fr);
  }

  .match-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding-right: 0;
  }

  .match-result-badge {
    position: static;
    margin-bottom: 1rem;
    display: inline-block;
  }
}
</style>