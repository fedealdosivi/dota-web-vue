<template>
	<div class="matches-container">
		<div class="matches-header">
			<h1 class="page-title">
				<span class="title-icon">🎮</span>
				Hero Matches
			</h1>
			<p class="subtitle">Recent matches with this hero</p>
		</div>

		<b-loading :active="loading" :is-full-page="false"></b-loading>

		<div v-if="!loading && (!matches || matches.length < 1)" class="empty-state">
			<div class="empty-icon">🎯</div>
			<h3>No matches found</h3>
			<p>Looks so empty</p>
		</div>

		<transition-group v-else-if="!loading" name="fade-slide" tag="div" class="matches-grid">
			<div
				v-for="m in matches"
				:key="m.match_id"
				:class="['box', 'match-card', getMatchResultClass(m.radiant_win, m.radiant)]"
			>
				<div class="match-result-badge">
					<b-tag :class="['result-text', getMatchResultClass(m.radiant_win, m.radiant)]">
						{{ getMatchResult(m.radiant_win, m.radiant) }}
					</b-tag>
				</div>

				<div class="match-header">
					<div class="match-id-section">
						<span class="id-label">Match ID</span>
						<span class="id-value">{{ m.match_id }}</span>
					</div>
					<div v-if="m.league_name" class="league-badge">
						<span class="league-icon">🏆</span>
						{{ m.league_name }}
					</div>
				</div>

				<div class="team-indicator">
					<span class="team-label">Played for:</span>
					<b-tag :class="['team-value', m.radiant ? 'radiant' : 'dire']">
						{{ m.radiant ? 'Radiant' : 'Dire' }}
					</b-tag>
				</div>

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

				<div class="action-buttons">
					<b-button
						tag="a"
						:href="'/#/matches/' + m.match_id"
						class="action-btn details-btn"
						type="is-primary"
						outlined
					>
						<span class="btn-icon">🔍</span>
						Match Details
					</b-button>
					<b-button
						tag="a"
						:href="'/#/player/' + m.account_id"
						class="action-btn player-btn"
						type="is-info"
						outlined
					>
						<span class="btn-icon">👤</span>
						Player Profile
					</b-button>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script>
	import heroeService from '../services/heroeService';
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
			getMatches() {
				this.loading = true;
				heroeService.getMatchHeroeById(this.id)
					.then((response) => {
						this.matches = response.data;
						this.loading = false;
					})
					.catch(() => {
						this.matches = [];
						this.loading = false;
					})
			},

			getMatchResult(radiant_win, played_radiant) {
				return (radiant_win === played_radiant) ? 'Victory' : 'Defeat';
			},

			getMatchResultClass(radiant_win, played_radiant) {
				return (radiant_win === played_radiant) ? 'win' : 'loss';
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
.matches-container {
	max-width: 1400px;
	margin: 0 auto;
	padding: 2rem;
	position: relative;
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
	color: #7a7a7a;
	font-size: 1.1rem;
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
	grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
	gap: 1.5rem;
}

.match-card {
	position: relative;
	border-radius: 16px;
	border: 1px solid #dbdbdb;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	transition: all 0.3s ease;
	overflow: hidden;
}

.match-card.win {
	border-left: 6px solid #00b894;
}

.match-card.loss {
	border-left: 6px solid #d63031;
}

.match-card:hover {
	transform: translateY(-6px);
	box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.match-result-badge {
	position: absolute;
	top: 16px;
	right: 16px;
	z-index: 10;
}

.result-text.win {
	background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
	color: white;
	border: none;
}

.result-text.loss {
	background: linear-gradient(135deg, #d63031 0%, #ff7675 100%);
	color: white;
	border: none;
}

.match-header {
	margin-bottom: 1.5rem;
	padding-bottom: 1rem;
	padding-right: 100px;
	border-bottom: 2px solid #f0f0f0;
}

.match-id-section {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-bottom: 1rem;
}

.id-label {
	font-size: 0.75rem;
	color: #7a7a7a;
	text-transform: uppercase;
	letter-spacing: 0.5px;
}

.id-value {
	font-size: 1.4rem;
	font-weight: 800;
	color: #2c3e50;
}

.league-badge {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem 1rem;
	background: #f8f9fa;
	border-radius: 12px;
	font-size: 0.85rem;
	font-weight: 600;
	color: #2c3e50;
}

.league-icon {
	font-size: 1rem;
}

.team-indicator {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	margin-bottom: 1.5rem;
	padding: 1rem;
	background: #f8f9fa;
	border-radius: 12px;
}

.team-label {
	font-size: 0.85rem;
	color: #7a7a7a;
	text-transform: uppercase;
	letter-spacing: 0.5px;
}

.team-value {
	font-size: 1.1rem;
	font-weight: 700;
}

.team-value.radiant {
	background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
	color: white;
	border: none;
}

.team-value.dire {
	background: linear-gradient(135deg, #d63031 0%, #ff7675 100%);
	color: white;
	border: none;
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
	color: #7a7a7a;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	margin-top: 0.25rem;
}

.stat-divider {
	font-size: 1.5rem;
	color: #dbdbdb;
	font-weight: 300;
}

.kda-ratio {
	text-align: center;
	padding-top: 1rem;
	border-top: 2px solid #dbdbdb;
}

.kda-label {
	font-size: 0.9rem;
	color: #7a7a7a;
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

.action-buttons {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.75rem;
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

@media (max-width: 768px) {
	.matches-container {
		padding: 1rem;
	}

	.page-title {
		font-size: 2rem;
		flex-direction: column;
	}

	.matches-grid {
		grid-template-columns: 1fr;
	}

	.match-header {
		padding-right: 0;
	}

	.match-result-badge {
		position: static;
		margin-bottom: 1rem;
		display: inline-block;
	}

	.action-buttons {
		grid-template-columns: 1fr;
	}
}
</style>
