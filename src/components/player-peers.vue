<template>
	<div class="peers-container">
		<div class="peers-header">
			<h1 class="page-title">
				<span class="title-icon">👥</span>
				Player Peers
			</h1>
			<p class="subtitle">Players you recently played with</p>
		</div>

		<div v-if="loading" class="loading-state">
			<div class="spinner"></div>
			<p>Loading peers...</p>
		</div>

		<div v-else-if="!peers || peers.length < 1" class="empty-state">
			<div class="empty-icon">😔</div>
			<h3>No peers found</h3>
			<p>Looks like you are alone in this world</p>
		</div>

		<transition-group v-else name="fade-slide" tag="div" class="peers-grid">
			<b-card
				v-for="p in peers"
				:key="p.account_id"
				class="peer-card"
			>
				<div class="peer-header">
					<b-img :src="p.avatarfull" alt="Avatar" class="peer-avatar" />
					<div class="peer-info">
						<h3 class="peer-name">{{ p.personaname }}</h3>
						<p class="peer-id">ID: {{ p.account_id }}</p>
					</div>
				</div>

				<div class="stats-section">
					<div class="stat-row">
						<div class="stat-box games">
							<div class="stat-icon">🎮</div>
							<div class="stat-content">
								<div class="stat-label">Games Together</div>
								<div class="stat-value">{{ p.games }}</div>
							</div>
						</div>
						<div class="stat-box wins">
							<div class="stat-icon">✅</div>
							<div class="stat-content">
								<div class="stat-label">Wins</div>
								<div class="stat-value">{{ p.win }}</div>
							</div>
						</div>
					</div>
					<div class="stat-box winrate">
						<div class="stat-icon">📊</div>
						<div class="stat-content">
							<div class="stat-label">Win Rate</div>
							<div class="stat-value">{{ calculateWinRate(p.win, p.games) }}%</div>
						</div>
					</div>
					<div class="stat-box last-played">
						<div class="stat-icon">🕐</div>
						<div class="stat-content">
							<div class="stat-label">Last Played Together</div>
							<div class="stat-value last-played-text">{{ formatDate(p.last_played) }}</div>
						</div>
					</div>
				</div>

				<div class="action-buttons">
					<b-button
						:href="'/#/player/' + p.account_id"
						class="action-btn profile-btn"
					>
						<span class="btn-icon">👤</span>
						Profile
					</b-button>
					<b-button
						:href="'#/player/'+ p.account_id +'/peers'"
						class="action-btn peers-btn"
					>
						<span class="btn-icon">👥</span>
						Peers
					</b-button>
					<b-button
						:href="'#/player/'+ p.account_id + '/rmatches/'"
						class="action-btn matches-btn"
					>
						<span class="btn-icon">📋</span>
						Matches
					</b-button>
					<b-button
						:href="'#/player/'+ p.account_id + '/heroes/'"
						class="action-btn heroes-btn"
					>
						<span class="btn-icon">🦸</span>
						Heroes
					</b-button>
				</div>
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
				peers: [],
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
				this.getPeers(this.id);
			}
		},

		created() {
			this.getPeers(this.id);
		},

		methods: {
			getPeers() {
				this.loading = true;
				playerService.getPeersByPlayerId(this.id)
					.then((response) => {
						this.peers = response.data;
						this.loading = false;
					})
					.catch(() => {
						this.peers = [];
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
.peers-container {
	max-width: 1400px;
	margin: 0 auto;
	padding: 2rem;
}

.peers-header {
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

.peers-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
	gap: 1.5rem;
}

.peer-card {
	border-radius: 16px;
	border: none;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	transition: all 0.3s ease;
	overflow: hidden;
}

.peer-card:hover {
	transform: translateY(-6px);
	box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.peer-header {
	display: flex;
	align-items: center;
	gap: 1.5rem;
	margin-bottom: 1.5rem;
	padding-bottom: 1.5rem;
	border-bottom: 2px solid #f0f0f0;
}

.peer-avatar {
	width: 80px;
	height: 80px;
	border-radius: 12px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	flex-shrink: 0;
}

.peer-info {
	flex: 1;
	min-width: 0;
}

.peer-name {
	font-size: 1.4rem;
	font-weight: 700;
	color: #2c3e50;
	margin-bottom: 0.5rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.peer-id {
	color: #6c757d;
	font-size: 0.9rem;
	margin: 0;
}

.stats-section {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 1.5rem;
}

.stat-row {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
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

.stat-box.games {
	border-left: 4px solid #667eea;
}

.stat-box.wins {
	border-left: 4px solid #00b894;
}

.stat-box.winrate,
.stat-box.last-played {
	border-left: 4px solid #fdcb6e;
}

.stat-icon {
	font-size: 1.8rem;
	line-height: 1;
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
	font-size: 1.5rem;
	font-weight: 800;
	color: #2c3e50;
}

.stat-value.last-played-text {
	font-size: 1.1rem;
	font-weight: 600;
}

.action-buttons {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.75rem;
}

.action-btn {
	padding: 0.75rem;
	border-radius: 12px;
	background: white;
	border: 2px solid #e9ecef;
	color: #2c3e50;
	font-weight: 600;
	font-size: 0.9rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	transition: all 0.3s ease;
}

.action-btn:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.profile-btn:hover {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-color: transparent;
	color: white;
}

.peers-btn:hover {
	background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
	border-color: transparent;
	color: white;
}

.matches-btn:hover {
	background: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%);
	border-color: transparent;
	color: white;
}

.heroes-btn:hover {
	background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
	border-color: transparent;
	color: white;
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
	.peers-container {
		padding: 1rem;
	}

	.page-title {
		font-size: 2rem;
		flex-direction: column;
	}

	.peers-grid {
		grid-template-columns: 1fr;
	}

	.peer-header {
		flex-direction: column;
		text-align: center;
	}

	.stat-row {
		grid-template-columns: 1fr;
	}

	.action-buttons {
		grid-template-columns: 1fr;
	}
}
</style>