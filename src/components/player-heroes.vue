<template>
	<div class="heroes-container">
		<div class="heroes-header">
			<h1 class="page-title">
				<span class="title-icon">🦸</span>
				Hero Statistics
			</h1>
			<p class="subtitle">Your performance across different heroes</p>
		</div>

		<div v-if="loading" class="loading-state">
			<div class="spinner"></div>
			<p>Loading hero statistics...</p>
		</div>

		<div v-else-if="!heroes || heroes.length < 1" class="empty-state">
			<div class="empty-icon">🎯</div>
			<h3>No hero data found</h3>
			<p>Looks like you need to start playing</p>
		</div>

		<transition-group v-else name="fade-slide" tag="div" class="heroes-grid">
			<b-card
				v-for="h in heroes"
				:key="h.hero_id"
				class="hero-card"
			>
				<div class="hero-header">
					<div class="hero-id-badge">
						<span class="badge-label">Hero ID</span>
						<span class="badge-value">{{ h.hero_id }}</span>
					</div>
				</div>

				<div class="stats-grid">
					<div class="stat-item games">
						<div class="stat-icon">🎮</div>
						<div class="stat-details">
							<div class="stat-label">Games Played</div>
							<div class="stat-value">{{ h.games }}</div>
						</div>
					</div>

					<div class="stat-item wins">
						<div class="stat-icon">✅</div>
						<div class="stat-details">
							<div class="stat-label">Wins</div>
							<div class="stat-value">{{ h.win }}</div>
						</div>
					</div>

					<div class="stat-item winrate">
						<div class="stat-icon">📊</div>
						<div class="stat-details">
							<div class="stat-label">Win Rate</div>
							<div class="stat-value">{{ calculateWinRate(h.win, h.games) }}%</div>
						</div>
					</div>

					<div class="stat-item last-played">
						<div class="stat-icon">🕐</div>
						<div class="stat-details">
							<div class="stat-label">Last Played</div>
							<div class="stat-value last-played-text">{{ formatDate(h.last_played) }}</div>
						</div>
					</div>
				</div>

				<b-button
					:href="'#/heroes/'+ h.hero_id + '/matches/'"
					class="matches-btn"
				>
					<span class="btn-icon">🔍</span>
					Discover Matches
				</b-button>
			</b-card>
		</transition-group>
	</div>
</template>

<script>
	import playerService from '../services/playerService';
	export default {
		name: 'playerPeers',
		props: ['vista'],
		data() {
			return {
				heroes: [],
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
				this.getHeroes(this.id);
			}
		},

		created() {
			this.getHeroes(this.id);
		},

		methods: {
			getHeroes() {
				this.loading = true;
				playerService.getWinLosesByPlayerIdPerHeroe(this.id)
					.then((response) => {
						this.heroes = response.data;
						this.loading = false;
					})
					.catch(() => {
						this.heroes = [];
						this.loading = false;
					})
			},

			calculateWinRate(wins, games) {
				if (!games || games === 0) return 0;
				return Math.round((wins / games) * 100);
			},

			formatDate(timestamp) {
				if (!timestamp) return 'N/A';
				const date = new Date(timestamp * 1000);
				const now = new Date();
				const diff = now - date;
				const days = Math.floor(diff / (1000 * 60 * 60 * 24));

				if (days === 0) return 'Today';
				if (days === 1) return 'Yesterday';
				if (days < 30) return `${days} days ago`;
				return date.toLocaleDateString();
			}
		}
	}
</script>

<style scoped>
.heroes-container {
	max-width: 1400px;
	margin: 0 auto;
	padding: 2rem;
}

.heroes-header {
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

.heroes-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
	gap: 1.5rem;
}

.hero-card {
	border-radius: 16px;
	border: none;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	transition: all 0.3s ease;
	overflow: hidden;
}

.hero-card:hover {
	transform: translateY(-6px);
	box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.hero-header {
	margin-bottom: 1.5rem;
	text-align: center;
}

.hero-id-badge {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	padding: 1rem 2rem;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-radius: 12px;
	color: white;
}

.badge-label {
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	opacity: 0.9;
}

.badge-value {
	font-size: 1.8rem;
	font-weight: 800;
}

.stats-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
	margin-bottom: 1.5rem;
}

.stat-item {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	padding: 1rem;
	background: #f8f9fa;
	border-radius: 12px;
	transition: all 0.3s ease;
}

.stat-item:hover {
	background: #e9ecef;
	transform: translateY(-2px);
}

.stat-item.games {
	border-left: 4px solid #667eea;
}

.stat-item.wins {
	border-left: 4px solid #00b894;
}

.stat-item.winrate {
	border-left: 4px solid #fdcb6e;
}

.stat-item.last-played {
	grid-column: 1 / -1;
	border-left: 4px solid #a29bfe;
}

.stat-icon {
	font-size: 1.8rem;
	line-height: 1;
	flex-shrink: 0;
}

.stat-details {
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
	font-size: 1.5rem;
	font-weight: 800;
	color: #2c3e50;
}

.stat-value.last-played-text {
	font-size: 1.1rem;
	font-weight: 600;
}

.matches-btn {
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

.matches-btn:hover {
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
	.heroes-container {
		padding: 1rem;
	}

	.page-title {
		font-size: 2rem;
		flex-direction: column;
	}

	.heroes-grid {
		grid-template-columns: 1fr;
	}
}
</style>