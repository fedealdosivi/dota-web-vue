<template>
	<div class="search-container">
		<div class="search-header">
			<h1 class="page-title">
				<span class="title-icon">🔍</span>
				Player Search
			</h1>
			<p class="subtitle">Find and discover Dota 2 player statistics</p>
		</div>

		<div class="box search-card">
			<b-field grouped>
				<b-input
					v-model="playerName"
					type="text"
					placeholder="Enter player name..."
					expanded
					@keyup.native.enter="searchPlayer()"
				></b-input>
				<p class="control">
					<b-button
						type="is-primary"
						:disabled="!formOk"
						:loading="loading"
						@click="searchPlayer()"
					>
						Search
					</b-button>
				</p>
			</b-field>
		</div>

		<b-loading :active="loading" :is-full-page="false">
			<p>{{ showingSearchResults ? 'Searching for players...' : 'Loading top players...' }}</p>
		</b-loading>

		<!-- Search Results -->
		<div v-if="showingSearchResults && !loading">
			<transition-group name="fade-slide" tag="div" class="results-grid">
				<div v-if="this.players === null && !loading" key="no-results" class="box no-results">
					<div class="no-results-icon">😕</div>
					<h3 class="title is-4">Player not found</h3>
					<p class="subtitle is-6">Try searching with a different name</p>
				</div>

				<div
					v-else
					v-for="p in this.players"
					:key="p.account_id"
					class="box player-card"
				>
					<div class="player-header">
						<figure class="image is-96x96 player-avatar">
							<img :src="p.avatarfull" alt="Avatar" class="is-rounded" />
						</figure>
						<div class="player-info">
							<h4 class="title is-4 player-name">{{ p.personaname }}</h4>
							<p class="subtitle is-6 player-id">ID: {{ p.account_id }}</p>
							<p class="player-last-match">
								Last Match: {{ formatDate(p.last_match_time) }}
							</p>
						</div>
					</div>

					<div class="buttons player-actions">
						<b-button
							tag="a"
							:href="'#/player/'+ p.account_id"
							type="is-primary"
							icon-left="account"
						>
							Profile
						</b-button>
						<b-button
							tag="a"
							:href="'#/player/'+ p.account_id + '/heroes/'"
							type="is-info"
							outlined
						>
							🦸 Heroes
						</b-button>
						<b-button
							tag="a"
							:href="'#/player/'+ p.account_id + '/rmatches/'"
							type="is-info"
							outlined
						>
							📊 Matches
						</b-button>
						<b-button
							tag="a"
							:href="'#/player/'+ p.account_id +'/peers'"
							type="is-info"
							outlined
						>
							👥 Peers
						</b-button>
					</div>
				</div>
			</transition-group>

			<!-- Pagination for search results -->
			<b-pagination
				v-if="players && players.length > 0"
				:total="searchTotal"
				:current="searchCurrentPage"
				:per-page="perPage"
				@change="onSearchPageChange"
				aria-next-label="Next page"
				aria-previous-label="Previous page"
				aria-page-label="Page"
				aria-current-label="Current page"
				class="pagination-container"
			>
			</b-pagination>
		</div>

		<!-- Top Players List -->
		<div v-else-if="!loading && topPlayers.length > 0" class="top-players-section">
			<div class="section-header">
				<h2 class="title is-3">
					<span class="header-icon">🏆</span>
					Top Players
				</h2>
				<p class="subtitle is-5">Highest ranked players in the world</p>
			</div>

			<div class="top-players-grid">
				<div
					v-for="(player, index) in paginatedTopPlayers"
					:key="player.account_id"
					class="box top-player-card"
				>
					<div class="rank-badge">
						<span class="rank-number">#{{ getRankNumber(index) }}</span>
					</div>

					<div class="player-content">
						<figure class="image is-64x64 player-avatar">
							<img :src="player.avatar || player.avatarfull" alt="Avatar" class="is-rounded" />
						</figure>

						<div class="player-details">
							<h4 class="player-name">{{ player.personaname || player.name }}</h4>

							<div class="player-meta">
								<span v-if="player.team_name" class="team-tag">
									🛡️ {{ player.team_name }}
								</span>
								<span v-if="player.country_code" class="country-flag">
									{{ getCountryFlag(player.country_code) }}
								</span>
							</div>

							<div class="mmr-info" v-if="player.computed_mmr || player.computed_mmr_turbo">
								<span class="mmr-label">MMR:</span>
								<span class="mmr-value">{{ formatMMR(player.computed_mmr || player.computed_mmr_turbo) }}</span>
							</div>
						</div>
					</div>

					<div class="player-actions-mini">
						<b-button
							tag="a"
							:href="'#/player/'+ player.account_id"
							type="is-primary"
							size="is-small"
						>
							View Profile
						</b-button>
					</div>
				</div>
			</div>

			<!-- Pagination for top players -->
			<b-pagination
				:total="topPlayers.length"
				:current="topPlayersCurrentPage"
				:per-page="perPage"
				@change="onTopPlayersPageChange"
				aria-next-label="Next page"
				aria-previous-label="Previous page"
				aria-page-label="Page"
				aria-current-label="Current page"
				class="pagination-container"
			>
			</b-pagination>
		</div>
	</div>
</template>

<script>
	import playerService from '../services/playerService';
	export default {
		data() {
			return {
				playerName:'',
				players :[],
				topPlayers: [],
				loading:false,
				showingSearchResults: false,
				perPage: 10,
				topPlayersCurrentPage: 1,
				searchCurrentPage: 1,
				searchTotal: 100 // OpenDota API typically returns up to 100 results
			}
		},

	    computed:{
	      formOk() {
	        return this.playerName;
	      },

				paginatedTopPlayers() {
					const start = (this.topPlayersCurrentPage - 1) * this.perPage;
					const end = start + this.perPage;
					return this.topPlayers.slice(start, end);
				}
	    },

		created() {
			this.loadTopPlayers();
		},

		methods: {
				loadTopPlayers() {
					this.loading = true;
					this.showingSearchResults = false;
					this.topPlayersCurrentPage = 1;
					playerService.getTopPlayers()
						.then((response) => {
							this.topPlayers = response.data;
							this.loading = false;
						})
						.catch((error) => {
							console.error('Error loading top players:', error);
							this.loading = false;
						});
				},

				searchPlayer(){
					if (!this.playerName) {
						// If search is empty, show top players again
						this.showingSearchResults = false;
						this.players = [];
						this.searchCurrentPage = 1;
						return;
					}

					this.searchCurrentPage = 1;
					this.getPlayer();
				},

		    getPlayer(){
	    	  this.loading=true;
					this.showingSearchResults = true;
		      playerService.getPlayerByPersonaname(this.playerName, this.perPage)
		      .then((response) => {
		                      this.players = response.data;
		                      this.loading = false;
		                  })
		                  .catch((error) => {
		                      this.players=null;
		                      this.loading=false;
		                  })
				},

				onTopPlayersPageChange(page) {
					this.topPlayersCurrentPage = page;
					// Scroll to top of page
					window.scrollTo({ top: 0, behavior: 'smooth' });
				},

				onSearchPageChange(page) {
					this.searchCurrentPage = page;
					// Note: OpenDota search API doesn't support offset/pagination
					// This is a client-side pagination limitation
					window.scrollTo({ top: 0, behavior: 'smooth' });
				},

				getRankNumber(index) {
					return (this.topPlayersCurrentPage - 1) * this.perPage + index + 1;
				},

				formatDate(timestamp) {
					if (!timestamp) return 'N/A';
					const date = new Date(timestamp * 1000);
					return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
				},

				formatMMR(mmr) {
					if (!mmr) return 'N/A';
					return mmr.toLocaleString();
				},

				getCountryFlag(countryCode) {
					if (!countryCode) return '';
					// Convert country code to flag emoji
					const codePoints = countryCode
						.toUpperCase()
						.split('')
						.map(char => 127397 + char.charCodeAt());
					return String.fromCodePoint(...codePoints);
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
	background: var(--dota-gradient-primary);
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
	color: var(--dota-text-muted);
	font-size: 1.1rem;
}

.search-card {
	margin-bottom: 2rem;
}

.results-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1.5rem;
	margin-bottom: 2rem;
}

.no-results {
	text-align: center;
	padding: 3rem;
}

.no-results-icon {
	font-size: 4rem;
	margin-bottom: 1rem;
}

.player-card {
	transition: all 0.3s ease;
}

.player-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 8px 30px rgba(224, 49, 49, 0.3) !important;
}

.player-header {
	display: flex;
	gap: 1.5rem;
	margin-bottom: 1.5rem;
	padding-bottom: 1.5rem;
	border-bottom: 1px solid var(--dota-border);
	align-items: center;
}

.player-avatar {
	flex-shrink: 0;
}

.player-info {
	flex: 1;
}

.player-name {
	margin-bottom: 1rem !important;
	color: var(--dota-text-primary) !important;
	word-wrap: break-word;
	overflow-wrap: break-word;
}

.player-id {
	margin-bottom: 0.5rem !important;
	color: var(--dota-text-secondary) !important;
}

.player-last-match {
	color: var(--dota-text-muted);
	font-size: 0.9rem;
}

.player-actions {
	margin-top: 1rem;
}

/* Top Players Section */
.top-players-section {
	margin-top: 3rem;
}

.section-header {
	text-align: center;
	margin-bottom: 2rem;
}

.section-header .title {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	color: var(--dota-text-primary) !important;
}

.header-icon {
	font-size: 2rem;
}

.section-header .subtitle {
	color: var(--dota-text-secondary) !important;
}

.top-players-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	gap: 1.5rem;
	margin-bottom: 2rem;
}

.top-player-card {
	position: relative;
	transition: all 0.3s ease;
	overflow: hidden;
}

.top-player-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 8px 30px rgba(224, 49, 49, 0.3) !important;
}

.rank-badge {
	position: absolute;
	top: -5px;
	right: -5px;
	background: var(--dota-gradient-primary);
	color: white;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	font-size: 1.1rem;
	box-shadow: 0 4px 15px rgba(224, 49, 49, 0.4);
	z-index: 1;
}

.player-content {
	display: flex;
	gap: 1rem;
	align-items: center;
	margin-bottom: 1rem;
}

.player-details {
	flex: 1;
}

.player-details .player-name {
	font-size: 1.1rem;
	font-weight: 600;
	margin-bottom: 0.5rem;
	color: var(--dota-text-primary);
}

.player-meta {
	display: flex;
	gap: 0.75rem;
	align-items: center;
	margin-bottom: 0.5rem;
	flex-wrap: wrap;
}

.team-tag {
	display: inline-flex;
	align-items: center;
	gap: 0.25rem;
	font-size: 0.85rem;
	color: var(--dota-accent-orange);
	font-weight: 500;
}

.country-flag {
	font-size: 1.2rem;
}

.mmr-info {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin-top: 0.5rem;
}

.mmr-label {
	font-size: 0.85rem;
	color: var(--dota-text-muted);
	font-weight: 500;
}

.mmr-value {
	font-size: 1rem;
	font-weight: 700;
	color: var(--dota-accent-gold);
}

.player-actions-mini {
	display: flex;
	justify-content: flex-end;
}

/* Pagination */
.pagination-container {
	margin-top: 2rem;
	margin-bottom: 2rem;
	display: flex;
	justify-content: center;
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

@media (max-width: 1024px) {
	.results-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media (max-width: 768px) {
	.search-container {
		padding: 1rem;
	}

	.page-title {
		font-size: 2rem;
	}

	.results-grid {
		grid-template-columns: 1fr;
	}

	.player-header {
		flex-direction: column;
		text-align: center;
	}

	.player-avatar {
		margin: 0 auto;
	}

	.top-players-grid {
		grid-template-columns: 1fr;
	}

	.player-content {
		flex-direction: column;
		text-align: center;
	}

	.player-meta {
		justify-content: center;
	}

	.mmr-info {
		justify-content: center;
	}
}
</style>