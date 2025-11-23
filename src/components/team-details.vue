<template>
	<div class="team-details-container">
		<div class="team-details-header">
			<h1 class="page-title">
				<span class="title-icon">🛡️</span>
				Team Profile
			</h1>
			<p class="subtitle">Team information and statistics</p>
		</div>

		<div v-if="loading" class="loading-state">
			<div class="spinner"></div>
			<p>Loading team details...</p>
		</div>

		<div v-else-if="!team" class="empty-state">
			<div class="empty-icon">😕</div>
			<h3>Team not found</h3>
			<p>Looks so empty</p>
		</div>

		<div v-else class="team-content">
			<!-- Team Header Card -->
			<b-card class="team-header-card">
				<div class="team-header">
					<h2 class="team-name">{{ team.name }}</h2>
					<div class="team-tag">{{ team.tag }}</div>
				</div>
			</b-card>

			<!-- Team Stats Grid -->
			<div class="stats-grid">
				<b-card class="stat-card rating">
					<div class="stat-icon">⭐</div>
					<div class="stat-content">
						<div class="stat-label">Rating</div>
						<div class="stat-value">{{ team.rating || 'N/A' }}</div>
					</div>
				</b-card>

				<b-card class="stat-card wins">
					<div class="stat-icon">✅</div>
					<div class="stat-content">
						<div class="stat-label">Wins</div>
						<div class="stat-value">{{ team.wins }}</div>
					</div>
				</b-card>

				<b-card class="stat-card losses">
					<div class="stat-icon">❌</div>
					<div class="stat-content">
						<div class="stat-label">Losses</div>
						<div class="stat-value">{{ team.losses }}</div>
					</div>
				</b-card>

				<b-card class="stat-card winrate">
					<div class="stat-icon">📊</div>
					<div class="stat-content">
						<div class="stat-label">Win Rate</div>
						<div class="stat-value">{{ calculateWinRate(team.wins, team.losses) }}%</div>
					</div>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script>
import teamService from '../services/teamService';
export default {
	data() {
		return {
			team: null,
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
			this.getTeam();
		}
	},

	created() {
		this.getTeam();
	},

	methods: {
		getTeam() {
			this.loading = true;
			teamService.getTeamById(this.id)
				.then((response) => {
					this.team = response.data;
					this.loading = false;
				})
				.catch(() => {
					this.team = null;
					this.loading = false;
				})
		},

		calculateWinRate(wins, losses) {
			const total = wins + losses;
			if (total === 0) return 0;
			return Math.round((wins / total) * 100);
		}
	}
}
</script>

<style scoped>
.team-details-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem;
}

.team-details-header {
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

.team-content {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.team-header-card {
	border-radius: 16px;
	border: none;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
}

.team-header {
	text-align: center;
	padding: 2rem;
}

.team-name {
	font-size: 2.5rem;
	font-weight: 800;
	margin-bottom: 1rem;
	color: white;
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.team-tag {
	display: inline-block;
	padding: 0.75rem 2rem;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 12px;
	font-size: 1.5rem;
	font-weight: 700;
	backdrop-filter: blur(10px);
	border: 2px solid rgba(255, 255, 255, 0.3);
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
	transform: translateY(-6px);
	box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
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

.stat-card.rating {
	background: linear-gradient(135deg, rgba(253, 203, 110, 0.1) 0%, rgba(253, 203, 110, 0.05) 100%);
}

.stat-card.wins {
	background: linear-gradient(135deg, rgba(0, 184, 148, 0.1) 0%, rgba(0, 206, 201, 0.05) 100%);
}

.stat-card.losses {
	background: linear-gradient(135deg, rgba(214, 48, 49, 0.1) 0%, rgba(255, 118, 117, 0.05) 100%);
}

.stat-card.winrate {
	background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%);
}

@media (max-width: 768px) {
	.team-details-container {
		padding: 1rem;
	}

	.page-title {
		font-size: 2rem;
		flex-direction: column;
	}

	.team-name {
		font-size: 2rem;
	}

	.team-tag {
		font-size: 1.2rem;
		padding: 0.5rem 1.5rem;
	}

	.stats-grid {
		grid-template-columns: 1fr;
	}
}
</style>