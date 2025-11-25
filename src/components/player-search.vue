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
					@keyup.native.enter="getPlayer()"
				></b-input>
				<p class="control">
					<b-button
						type="is-primary"
						:disabled="!formOk"
						:loading="loading"
						@click="getPlayer()"
					>
						Search
					</b-button>
				</p>
			</b-field>
		</div>

		<b-loading :active="loading" :is-full-page="false">
			<p>Searching for players...</p>
		</b-loading>

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

.search-card {
	margin-bottom: 2rem;
}

.results-grid {
	display: grid;
	gap: 1.5rem;
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
	box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
}

.player-header {
	display: flex;
	gap: 1.5rem;
	margin-bottom: 1.5rem;
	padding-bottom: 1.5rem;
	border-bottom: 1px solid #dbdbdb;
	align-items: center;
}

.player-avatar {
	flex-shrink: 0;
}

.player-info {
	flex: 1;
}

.player-name {
	margin-bottom: 0.5rem !important;
}

.player-id {
	margin-bottom: 0.25rem !important;
}

.player-last-match {
	color: #7a7a7a;
	font-size: 0.9rem;
}

.player-actions {
	margin-top: 1rem;
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

	.player-header {
		flex-direction: column;
		text-align: center;
	}

	.player-avatar {
		margin: 0 auto;
	}
}
</style>
