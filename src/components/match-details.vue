<template>
	<div class="match-details-container">
		<div class="match-details-header">
			<h1 class="page-title">
				<span class="title-icon">🎮</span>
				Match Details
			</h1>
			<p class="subtitle">Comprehensive match statistics and player performance</p>
		</div>

		<div v-if="loading" class="loading-state">
			<div class="spinner"></div>
			<p>Loading match details...</p>
		</div>

		<div v-else-if="!match" class="empty-state">
			<div class="empty-icon">😕</div>
			<h3>Match not found</h3>
			<p>Looks so empty</p>
		</div>

		<div v-else class="match-content">
			<!-- Match Overview Card -->
			<div class="box overview-card">
				<h2 class="section-title">
					<span class="section-icon">📊</span>
					Match Overview
				</h2>
				<div class="score-section">
					<div class="team-score radiant">
						<div class="team-label">
							<span class="team-icon">☀️</span>
							Radiant
						</div>
						<div class="team-score-value">{{ match.radiant_score }}</div>
					</div>
					<div class="vs-divider">VS</div>
					<div class="team-score dire">
						<div class="team-label">
							<span class="team-icon">🌙</span>
							Dire
						</div>
						<div class="team-score-value">{{ match.dire_score }}</div>
					</div>
				</div>
				<div class="match-info-grid">
					<div class="info-item">
						<span class="info-icon">👥</span>
						<div class="info-content">
							<div class="info-label">Human Players</div>
							<div class="info-value">{{ match.human_players }}</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Players Section -->
			<div class="players-section">
				<h2 class="section-title">
					<span class="section-icon">👥</span>
					Players Performance
				</h2>

				<transition-group name="fade-slide" tag="div" class="players-grid">
					<div
						v-for="p in match.players"
						:key="p.account_id"
						class="box player-card"
					>
						<div class="player-header">
							<h3 class="player-name">{{ p.personaname || 'Anonymous' }}</h3>
							<div class="player-id">ID: {{ p.account_id }}</div>
						</div>

						<div class="kda-display">
							<div class="kda-stats">
								<div class="kda-item kills">
									<div class="kda-number">{{ p.kills }}</div>
									<div class="kda-label">K</div>
								</div>
								<div class="kda-divider">/</div>
								<div class="kda-item deaths">
									<div class="kda-number">{{ p.deaths }}</div>
									<div class="kda-label">D</div>
								</div>
								<div class="kda-divider">/</div>
								<div class="kda-item assists">
									<div class="kda-number">{{ p.assists }}</div>
									<div class="kda-label">A</div>
								</div>
							</div>
							<div class="kda-ratio">
								KDA: <span class="ratio-value">{{ calculateKDA(p.kills, p.deaths, p.assists) }}</span>
							</div>
						</div>

						<div class="stats-grid">
							<div class="stat-box">
								<div class="stat-icon">💰</div>
								<div class="stat-content">
									<div class="stat-label">Total Gold</div>
									<div class="stat-value">{{ formatNumber(p.gold) }}</div>
								</div>
							</div>
							<div class="stat-box">
								<div class="stat-icon">📈</div>
								<div class="stat-content">
									<div class="stat-label">Gold/Min</div>
									<div class="stat-value">{{ p.gold_per_min }}</div>
								</div>
							</div>
						</div>

						<b-button
							tag="a"
							:href="'/#/player/' + p.account_id"
							type="is-primary"
							class="profile-btn"
						>
							<span class="btn-icon">👤</span>
							View Profile
						</b-button>
					</div>
				</transition-group>
			</div>
		</div>
	</div>
</template>

<script>
	import matchService from '../services/matchService';
	export default {
		data() {
			return {
				match: null,
				loading: false
			}
		},

		computed: {
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
				this.getMatch(this.id);
			}
		},

		created() {
			this.getMatch(this.id);
		},

		methods: {
			getMatch() {
				this.loading = true;
				matchService.getMatchById(this.id)
					.then((response) => {
						this.match = response.data;
						this.loading = false;
					})
					.catch(() => {
						this.match = null;
						this.loading = false;
					})
			},

			calculateKDA(kills, deaths, assists) {
				if (deaths === 0) {
					return ((kills + assists) || 0).toFixed(2);
				}
				return ((kills + assists) / deaths).toFixed(2);
			},

			formatNumber(num) {
				if (!num) return '0';
				return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
		}
	}
</script>

<style scoped>
.match-details-container {
	max-width: 1400px;
	margin: 0 auto;
	padding: 2rem;
}

.match-details-header {
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

.match-content {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.overview-card {
	border-radius: 16px;
	border: none;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.section-title {
	font-size: 1.8rem;
	font-weight: 700;
	color: #2c3e50;
	margin-bottom: 1.5rem;
	display: flex;
	align-items: center;
	gap: 0.75rem;
}

.section-icon {
	font-size: 1.8rem;
}

.score-section {
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	gap: 2rem;
	align-items: center;
	margin-bottom: 2rem;
	padding: 2rem;
	background: #f8f9fa;
	border-radius: 16px;
}

.team-score {
	text-align: center;
}

.team-label {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	font-size: 1.2rem;
	font-weight: 600;
	margin-bottom: 1rem;
	text-transform: uppercase;
	letter-spacing: 1px;
}

.team-icon {
	font-size: 1.5rem;
}

.team-score.radiant .team-label {
	color: #00b894;
}

.team-score.dire .team-label {
	color: #d63031;
}

.team-score-value {
	font-size: 3.5rem;
	font-weight: 800;
}

.team-score.radiant .team-score-value {
	background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
}

.team-score.dire .team-score-value {
	background: linear-gradient(135deg, #d63031 0%, #ff7675 100%);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
}

.vs-divider {
	font-size: 2rem;
	font-weight: 800;
	color: #6c757d;
	padding: 1rem 2rem;
	background: white;
	border-radius: 12px;
}

.match-info-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1rem;
}

.info-item {
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 1rem;
	background: #f8f9fa;
	border-radius: 12px;
}

.info-icon {
	font-size: 2rem;
}

.info-content {
	flex: 1;
}

.info-label {
	font-size: 0.85rem;
	color: #6c757d;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	margin-bottom: 0.25rem;
}

.info-value {
	font-size: 1.5rem;
	font-weight: 800;
	color: #2c3e50;
}

.players-section {
	margin-top: 1rem;
}

.players-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
	gap: 1.5rem;
}

.player-card {
	border-radius: 16px;
	border: none;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	transition: all 0.3s ease;
}

.player-card:hover {
	transform: translateY(-6px);
	box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.player-header {
	margin-bottom: 1.5rem;
	padding-bottom: 1rem;
	border-bottom: 2px solid #f0f0f0;
	text-align: center;
}

.player-name {
	font-size: 1.4rem;
	font-weight: 700;
	color: #2c3e50;
	margin-bottom: 0.5rem;
}

.player-id {
	font-size: 0.85rem;
	color: #6c757d;
}

.kda-display {
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

.kda-item {
	text-align: center;
}

.kda-number {
	font-size: 2rem;
	font-weight: 800;
}

.kda-item.kills .kda-number {
	color: #00b894;
}

.kda-item.deaths .kda-number {
	color: #d63031;
}

.kda-item.assists .kda-number {
	color: #7957d5;
}

.kda-label {
	font-size: 0.75rem;
	color: #6c757d;
	text-transform: uppercase;
	margin-top: 0.25rem;
}

.kda-divider {
	font-size: 1.5rem;
	color: #dee2e6;
	font-weight: 300;
}

.kda-ratio {
	text-align: center;
	padding-top: 1rem;
	border-top: 2px solid #e9ecef;
	font-size: 0.9rem;
	color: #6c757d;
}

.ratio-value {
	font-size: 1.5rem;
	font-weight: 800;
	background: linear-gradient(135deg, #7957d5 0%, #8e44ad 100%);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	margin-left: 0.5rem;
}

.stats-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
	margin-bottom: 1.5rem;
}

.stat-box {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	padding: 1rem;
	background: #f8f9fa;
	border-radius: 12px;
	transition: all 0.3s ease;
}

.stat-box:hover {
	background: #e9ecef;
	transform: translateY(-2px);
}

.stat-icon {
	font-size: 1.8rem;
	flex-shrink: 0;
}

.stat-content {
	flex: 1;
	min-width: 0;
}

.stat-label {
	font-size: 0.75rem;
	color: #6c757d;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	margin-bottom: 0.25rem;
}

.stat-value {
	font-size: 1.3rem;
	font-weight: 800;
	color: #2c3e50;
}

.profile-btn {
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

.profile-btn:hover {
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
	.match-details-container {
		padding: 1rem;
	}

	.page-title {
		font-size: 2rem;
		flex-direction: column;
	}

	.score-section {
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	.vs-divider {
		padding: 0.5rem 1rem;
		font-size: 1.5rem;
	}

	.players-grid {
		grid-template-columns: 1fr;
	}

	.stats-grid {
		grid-template-columns: 1fr;
	}
}
</style>