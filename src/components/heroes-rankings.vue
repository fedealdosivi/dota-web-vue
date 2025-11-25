<template>
	<div class="rankings-container">
		<div class="rankings-header">
			<h1 class="page-title">
				<span class="title-icon">🏆</span>
				Top Players
			</h1>
			<p class="subtitle">Highest ranked players with this hero</p>
		</div>

		<div v-if="loading" class="loading-state">
			<div class="spinner"></div>
			<p>Loading rankings...</p>
		</div>

		<div v-else-if="ranking==null" class="empty-state">
			<div class="empty-icon">📭</div>
			<h3>No rankings available</h3>
			<p>Check back later for player rankings</p>
		</div>

		<transition-group v-else name="fade-slide" tag="div" class="rankings-grid">
			<div
				v-for="(r, index) in ranking.rankings"
				:key="r.account_id"
				class="box player-rank-card"
			>
				<div class="rank-badge">
					<span class="rank-number">#{{ index + 1 }}</span>
				</div>

				<div class="player-content">
					<figure class="image is-128x128 avatar-figure">
						<img :src="r.avatar" alt="Avatar" class="player-avatar-img is-rounded" />
					</figure>

					<div class="player-details">
						<h4 class="player-persona">{{ r.personaname }}</h4>

						<div class="stats-grid">
							<div class="stat-item">
								<span class="stat-label">Score</span>
								<span class="stat-value score">{{ r.score }}</span>
							</div>
							<div class="stat-item">
								<span class="stat-label">Rank</span>
								<span class="stat-value rank">{{ r.solo_competitive_rank || 'Unranked' }}</span>
							</div>
						</div>

						<div class="last-login">
							<span class="login-icon">🕒</span>
							Last seen: {{ formatDate(r.last_login) }}
						</div>
					</div>
				</div>

				<b-button
					tag="a"
					:href="'/#/player/' + r.account_id"
					type="is-primary"
					class="view-profile-btn"
				>
					<span class="btn-icon">👤</span>
					View Profile
				</b-button>
			</div>
		</transition-group>
	</div>
</template>

<script>
	import heroeService from '../services/heroeService';
    export default {
     data() {
      return {
   	    ranking:'',
        loading:false
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
     this.getMatches(this.id);
   }
  },

  created() {
   this.getMatches(this.id);
  },

  methods: {
    getMatches(){
      this.loading=true;
      heroeService.getRankingPlayerByHero(this.id)
      .then((response) => {
        this.ranking = response.data;
        this.loading=false;
      })
      .catch(() => {
        this.ranking=null;
        this.loading=false;
      })
    },

    formatDate(timestamp) {
      if (!timestamp) return 'N/A';
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now - date;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (days === 0) return 'Today';
      if (days === 1) return 'Yesterday';
      if (days < 7) return `${days} days ago`;
      return date.toLocaleDateString();
    }
  }
}
</script>

<style scoped>
.rankings-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem;
}

.rankings-header {
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

.loading-state {
	text-align: center;
	padding: 3rem;
}

.spinner {
	width: 50px;
	height: 50px;
	border: 4px solid #f3f3f3;
	border-top: 4px solid #7957d5;
	border-radius: 50%;
	animation: spin 1s linear infinite;
	margin: 0 auto 1rem;
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
	font-size: 4rem;
	margin-bottom: 1rem;
}

.rankings-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	gap: 1.5rem;
}

.player-rank-card {
	position: relative;
	border-radius: 16px;
	border: none;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	transition: all 0.3s ease;
	overflow: hidden;
}

.player-rank-card:hover {
	transform: translateY(-6px);
	box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.rank-badge {
	position: absolute;
	top: 16px;
	right: 16px;
	background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
	color: white;
	padding: 0.5rem 1rem;
	border-radius: 20px;
	font-weight: 700;
	font-size: 1.1rem;
	box-shadow: 0 4px 12px rgba(240, 147, 251, 0.4);
	z-index: 10;
}

.rank-number {
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.player-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	padding: 1rem 0;
}

.avatar-figure {
	margin: 0 auto 1rem;
}

.player-avatar-img {
	border: 4px solid #f0f0f0;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.player-details {
	width: 100%;
}

.player-persona {
	font-size: 1.4rem;
	font-weight: 700;
	color: #2c3e50;
	margin-bottom: 1rem;
}

.stats-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	margin-bottom: 1rem;
	padding: 1rem;
	background: #f8f9fa;
	border-radius: 12px;
}

.stat-item {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

.stat-label {
	font-size: 0.85rem;
	color: #6c757d;
	text-transform: uppercase;
	letter-spacing: 0.5px;
}

.stat-value {
	font-size: 1.5rem;
	font-weight: 700;
}

.stat-value.score {
	background: linear-gradient(135deg, #7957d5 0%, #8e44ad 100%);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
}

.stat-value.rank {
	color: #f5576c;
}

.last-login {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	color: #6c757d;
	font-size: 0.9rem;
	margin-top: 0.5rem;
}

.login-icon {
	font-size: 1rem;
}

.view-profile-btn {
	width: 100%;
	margin-top: 1rem;
	padding: 0.75rem;
	border-radius: 12px;
	font-weight: 600;
	font-size: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	transition: all 0.3s ease;
}

.view-profile-btn:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(121, 87, 213, 0.4);
}

.btn-icon {
	font-size: 1.1rem;
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

/* Special styling for top 3 rankings */
.player-rank-card:nth-child(1) .rank-badge {
	background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
	font-size: 1.3rem;
}

.player-rank-card:nth-child(2) .rank-badge {
	background: linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%);
	font-size: 1.2rem;
}

.player-rank-card:nth-child(3) .rank-badge {
	background: linear-gradient(135deg, #cd7f32 0%, #e6a85c 100%);
	font-size: 1.2rem;
}

@media (max-width: 768px) {
	.rankings-container {
		padding: 1rem;
	}

	.page-title {
		font-size: 2rem;
	}

	.rankings-grid {
		grid-template-columns: 1fr;
	}

	.rank-badge {
		top: 12px;
		right: 12px;
		padding: 0.4rem 0.8rem;
		font-size: 1rem;
	}
}
</style>
