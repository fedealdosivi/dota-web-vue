<template>
	<div class="team-players-container">
		<div class="team-players-header">
			<h1 class="page-title">
				<span class="title-icon">👥</span>
				Team Players
			</h1>
			<p class="subtitle">Current and former team members</p>
		</div>

		<div v-if="loading" class="loading-state">
			<div class="spinner"></div>
			<p>Loading team players...</p>
		</div>

		<div v-else-if="!players || players.length < 1" class="empty-state">
			<div class="empty-icon">😕</div>
			<h3>No players found</h3>
			<p>No player data available for this team</p>
		</div>

		<transition-group v-else name="fade-slide" tag="div" class="players-grid">
			<b-card
				v-for="p in players"
				:key="p.account_id"
				class="player-card"
			>
				<!-- Member Status Badge -->
				<div class="status-badge">
					<span :class="['status-indicator', p.is_current_team_member ? 'active' : 'inactive']">
						{{ p.is_current_team_member ? '✓ Active Member' : '← Left Team' }}
					</span>
				</div>

				<div class="player-header">
					<h3 class="player-name">{{ p.name || 'Anonymous' }}</h3>
					<div class="player-id">ID: {{ p.account_id }}</div>
				</div>

				<div class="stats-section">
					<div class="stat-box games">
						<div class="stat-icon">🎮</div>
						<div class="stat-content">
							<div class="stat-label">Games Played</div>
							<div class="stat-value">{{ p.games_played }}</div>
						</div>
					</div>
					<div class="stat-box wins">
						<div class="stat-icon">✅</div>
						<div class="stat-content">
							<div class="stat-label">Wins</div>
							<div class="stat-value">{{ p.wins }}</div>
						</div>
					</div>
					<div class="stat-box winrate">
						<div class="stat-icon">📊</div>
						<div class="stat-content">
							<div class="stat-label">Win Rate</div>
							<div class="stat-value">{{ calculateWinRate(p.wins, p.games_played) }}%</div>
						</div>
					</div>
				</div>

				<b-button
					:href="'/#/player/' + p.account_id"
					class="profile-btn"
				>
					<span class="btn-icon">👤</span>
					View Profile
				</b-button>
			</b-card>
		</transition-group>
	</div>
</template>

<script>
import teamService from '../services/teamService';
export default {
	data() {
		return {
			players: [],
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
			this.getPlayers();
		}
	},

	created() {
		this.getPlayers();
	},

	methods: {
		getPlayers() {
			this.loading = true;
			teamService.getTeamPlayersById(this.id)
				.then((response) => {
					this.players = response.data;
					this.loading = false;
				})
				.catch(() => {
					this.players = [];
					this.loading = false;
				})
		},

		calculateWinRate(wins, games) {
			if (!games || games === 0) return 0;
			return Math.round((wins / games) * 100);
		}
	}
}
</script>

<style scoped>
.team-players-container {
	max-width: 1400px;
	margin: 0 auto;
	padding: 2rem;
}

.team-players-header {
	text-align: center;
	margin-bottom: 2rem;
}

.page-title {
	font-size: 2.5rem;
	font-weight: 700;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

.players-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
	gap: 1.5rem;
}

.player-card {
	position: relative;
	border-radius: 16px;
	border: none;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	transition: all 0.3s ease;
	overflow: hidden;
}

.player-card:hover {
	transform: translateY(-6px);
	box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.status-badge {
	position: absolute;
	top: 16px;
	right: 16px;
	z-index: 10;
}

.status-indicator {
	padding: 0.5rem 1rem;
	border-radius: 20px;
	font-weight: 700;
	font-size: 0.85rem;
}

.status-indicator.active {
	background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
	color: white;
}

.status-indicator.inactive {
	background: linear-gradient(135deg, #6c757d 0%, #adb5bd 100%);
	color: white;
}

.player-header {
	margin-bottom: 1.5rem;
	padding-bottom: 1rem;
	padding-right: 140px;
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

.stats-section {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 1.5rem;
}

.stat-box {
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 1rem;
	background: #f8f9fa;
	border-radius: 12px;
	transition: all 0.3s ease;
}

.stat-box:hover {
	background: #e9ecef;
	transform: translateY(-2px);
}

.stat-box.games {
	border-left: 4px solid #667eea;
}

.stat-box.wins {
	border-left: 4px solid #00b894;
}

.stat-box.winrate {
	border-left: 4px solid #fdcb6e;
}

.stat-icon {
	font-size: 2rem;
	line-height: 1;
	flex-shrink: 0;
}

.stat-content {
	flex: 1;
}

.stat-label {
	font-size: 0.75rem;
	color: #6c757d;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	margin-bottom: 0.25rem;
}

.stat-value {
	font-size: 1.5rem;
	font-weight: 800;
	color: #2c3e50;
}

.profile-btn {
	width: 100%;
	padding: 0.875rem;
	border-radius: 12px;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border: none;
	color: white;
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
	box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
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
	.team-players-container {
		padding: 1rem;
	}

	.page-title {
		font-size: 2rem;
		flex-direction: column;
	}

	.players-grid {
		grid-template-columns: 1fr;
	}

	.player-header {
		padding-right: 0;
	}

	.status-badge {
		position: static;
		margin-bottom: 1rem;
		display: inline-block;
	}
}
</style>