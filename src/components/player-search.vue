<template>
	<div class="search-container">
		<div class="search-header">
			<h1 class="page-title">
				<span class="title-icon">🔍</span>
				Player Search
			</h1>
			<p class="subtitle">Find and discover Dota 2 player statistics</p>
		</div>

		<b-card class="search-card">
			<div class="search-input-wrapper">
				<b-form-input
					v-model="playerName"
					type="text"
					placeholder="Enter player name..."
					class="modern-search-input"
					@keyup.enter="getPlayer()"
				></b-form-input>
				<b-button
					type="submit"
					:disabled="!formOk"
					@click='getPlayer()'
					class="search-button"
				>
					<span v-if="loading">🔄</span>
					<span v-else>Search</span>
				</b-button>
			</div>
		</b-card>

		<div v-if="loading" class="loading-state">
			<div class="spinner"></div>
			<p>Searching for players...</p>
		</div>

		<transition-group name="fade-slide" tag="div" class="results-grid">
			<div v-if="this.players === null && !loading" key="no-results" class="no-results">
				<div class="no-results-icon">😕</div>
				<h3>Player not found</h3>
				<p>Try searching with a different name</p>
			</div>

			<b-card
				v-else
				v-for="p in this.players"
				:key="p.account_id"
				class="player-card"
			>
				<div class="player-header">
					<b-img :src="p.avatarfull" alt="Avatar" class="player-avatar" />
					<div class="player-info">
						<h4 class="player-name">{{ p.personaname }}</h4>
						<p class="player-id">ID: {{ p.account_id }}</p>
						<p class="player-last-match">
							Last Match: {{ formatDate(p.last_match_time) }}
						</p>
					</div>
				</div>

				<div class="player-actions">
					<b-button
						:href="'#/player/'+ p.account_id"
						variant="primary"
						class="action-btn primary-action"
					>
						<span class="btn-icon">👤</span>
						Profile
					</b-button>
					<b-button
						:href="'#/player/'+ p.account_id + '/heroes/'"
						variant="outline-primary"
						class="action-btn"
					>
						<span class="btn-icon">🦸</span>
						Heroes
					</b-button>
					<b-button
						:href="'#/player/'+ p.account_id + '/rmatches/'"
						variant="outline-primary"
						class="action-btn"
					>
						<span class="btn-icon">📊</span>
						Matches
					</b-button>
					<b-button
						:href="'#/player/'+ p.account_id +'/peers'"
						variant="outline-primary"
						class="action-btn"
					>
						<span class="btn-icon">👥</span>
						Peers
					</b-button>
				</div>
			</b-card>
		</transition-group>
	</div>
</template>

<script>
	import playerService from '../services/playerService';
	export default {
		data() {
			return {
				playerName:'',
				players :[],
				loading:false
			}
		},

	    computed:{
	      formOk() {
	        return this.playerName;
	      }
	    },

		created() {
			this.getPlayer();
		},

		methods: {
		    getPlayer(){
	    	  this.loading=true;
		      playerService.getPlayerByPersonaname(this.playerName)
		      .then((response) => {
		                      this.players = response.data;
		                      this.loading = false;
		                  })
		                  .catch((error) => {
		                      this.players=null;
		                      this.loading=false;
		                  })
				},

				formatDate(timestamp) {
					if (!timestamp) return 'N/A';
					const date = new Date(timestamp * 1000);
					return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
				}
		    }

		}
</script>

<style scoped>
.search-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem;
}

.search-header {
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

.search-card {
	margin-bottom: 2rem;
	border-radius: 16px;
	border: none;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.search-input-wrapper {
	display: flex;
	gap: 1rem;
}

.modern-search-input {
	flex: 1;
	padding: 0.75rem 1.25rem;
	border-radius: 12px;
	border: 2px solid #e9ecef;
	font-size: 1.1rem;
	transition: all 0.3s ease;
}

.modern-search-input:focus {
	border-color: #667eea;
	box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.search-button {
	padding: 0.75rem 2rem;
	border-radius: 12px;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border: none;
	font-weight: 600;
	font-size: 1.1rem;
	transition: all 0.3s ease;
}

.search-button:hover:not(:disabled) {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.search-button:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.loading-state {
	text-align: center;
	padding: 3rem;
}

.spinner {
	width: 50px;
	height: 50px;
	border: 4px solid #f3f3f3;
	border-top: 4px solid #667eea;
	border-radius: 50%;
	animation: spin 1s linear infinite;
	margin: 0 auto 1rem;
}

@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}

.results-grid {
	display: grid;
	gap: 1.5rem;
}

.no-results {
	text-align: center;
	padding: 3rem;
	background: #f8f9fa;
	border-radius: 16px;
}

.no-results-icon {
	font-size: 4rem;
	margin-bottom: 1rem;
}

.player-card {
	border-radius: 16px;
	border: none;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	transition: all 0.3s ease;
	overflow: hidden;
}

.player-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.player-header {
	display: flex;
	gap: 1.5rem;
	margin-bottom: 1.5rem;
	padding-bottom: 1.5rem;
	border-bottom: 2px solid #f0f0f0;
}

.player-avatar {
	width: 100px;
	height: 100px;
	border-radius: 12px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.player-info {
	flex: 1;
}

.player-name {
	font-size: 1.5rem;
	font-weight: 700;
	color: #2c3e50;
	margin-bottom: 0.5rem;
}

.player-id {
	color: #6c757d;
	font-size: 0.9rem;
	margin-bottom: 0.25rem;
}

.player-last-match {
	color: #6c757d;
	font-size: 0.9rem;
}

.player-actions {
	display: flex;
	gap: 0.75rem;
	flex-wrap: wrap;
}

.action-btn {
	flex: 1;
	min-width: 120px;
	border-radius: 8px;
	font-weight: 600;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	transition: all 0.3s ease;
}

.primary-action {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border: none;
}

.primary-action:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
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
	.search-container {
		padding: 1rem;
	}

	.page-title {
		font-size: 2rem;
	}

	.search-input-wrapper {
		flex-direction: column;
	}

	.player-header {
		flex-direction: column;
		text-align: center;
	}

	.player-avatar {
		margin: 0 auto;
	}

	.action-btn {
		min-width: calc(50% - 0.375rem);
	}
}
</style>
