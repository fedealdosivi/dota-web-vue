<template>
	<div class="teams-container">
		<div class="teams-header">
			<h1 class="page-title">
				<span class="title-icon">🛡️</span>
				All Teams
			</h1>
			<p class="subtitle">Browse professional Dota 2 teams</p>
		</div>

		<div v-if="loading" class="loading-state">
			<div class="spinner"></div>
			<p>Loading teams...</p>
		</div>

		<div v-else-if="!teams || teams.length < 1" class="empty-state">
			<div class="empty-icon">🏆</div>
			<h3>No teams found</h3>
			<p>No teams are available at the moment</p>
		</div>

		<transition-group v-else name="fade-slide" tag="div" class="teams-grid">
			<b-card
				v-for="t in teams"
				:key="t.team_id"
				class="team-card"
			>
				<div class="team-logo-container">
					<div v-if="!imageLoaded[t.team_id]" class="team-logo-fallback">
						{{ getTeamInitials(t.name || t.tag) }}
					</div>
					<b-img
						v-show="imageLoaded[t.team_id]"
						:src="getTeamLogoUrl(t)"
						:alt="t.name"
						class="team-logo"
						@load="onImageLoad(t.team_id)"
						@error="onImageError(t.team_id)"
					/>
				</div>

				<div class="team-info">
					<div class="team-tag">{{ t.tag }}</div>
					<h3 class="team-name">{{ t.name }}</h3>
				</div>

				<div class="action-buttons">
					<b-button
						:href="'#/teams/' + t.team_id"
						class="action-btn details-btn"
					>
						<span class="btn-icon">📊</span>
						Team Details
					</b-button>
					<b-button
						:href="'#/teams/' + t.team_id + '/players/'"
						class="action-btn players-btn"
					>
						<span class="btn-icon">👥</span>
						View Players
					</b-button>
				</div>
			</b-card>
		</transition-group>
	</div>
</template>

<script>
import teamService from '../services/teamService';
export default {
	data() {
		return {
			teams: [],
			loading: false,
			imageLoaded: {}
		}
	},

	mounted() {
		this.loadTeams();
	},

	methods: {
		loadTeams() {
			this.loading = true;
			try {
				this.teams = teamService.getTeamsLocal();
				this.loading = false;
			} catch (error) {
				this.teams = [];
				this.loading = false;
			}
		},

		getTeamLogoUrl(team) {
			// Try original URL first
			if (team.logo_url) {
				return team.logo_url;
			}

			// Fallback: Use a placeholder service with team name
			const teamName = encodeURIComponent(team.name || team.tag || 'team');
			// Using UI Avatars as a fallback for text-based logos
			return `https://ui-avatars.com/api/?name=${teamName}&size=120&background=667eea&color=fff&bold=true&font-size=0.4`;
		},

		getTeamInitials(name) {
			if (!name) return '??';

			// Get first letters of each word (max 3)
			const words = name.trim().split(/\s+/);

			// For single word names (like "OG"), take first 2 characters
			if (words.length === 1 && words[0].length >= 2) {
				return words[0].substring(0, 2).toUpperCase();
			}

			const initials = words
				.slice(0, 3)
				.map(word => word[0])
				.join('')
				.toUpperCase();

			return initials || '??';
		},

		onImageLoad(teamId) {
			this.$set(this.imageLoaded, teamId, true);
		},

		onImageError(teamId) {
			this.$set(this.imageLoaded, teamId, false);
		}
	}
}
</script>

<style scoped>
.teams-container {
	max-width: 1400px;
	margin: 0 auto;
	padding: 2rem;
}

.teams-header {
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

.teams-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
	gap: 1.5rem;
}

.team-card {
	border-radius: 16px;
	border: none;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	transition: all 0.3s ease;
	overflow: hidden;
}

.team-card:hover {
	transform: translateY(-6px);
	box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.team-logo-container {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
	border-bottom: 2px solid #e9ecef;
}

.team-logo {
	width: 120px;
	height: 120px;
	object-fit: contain;
	filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.team-logo-fallback {
	width: 120px;
	height: 120px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-radius: 50%;
	font-size: 2.5rem;
	font-weight: 800;
	color: white;
	text-transform: uppercase;
	letter-spacing: 2px;
	box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.team-info {
	text-align: center;
	padding: 1.5rem;
	border-bottom: 2px solid #f0f0f0;
}

.team-tag {
	display: inline-block;
	padding: 0.5rem 1.5rem;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	border-radius: 20px;
	font-weight: 700;
	font-size: 1.1rem;
	margin-bottom: 1rem;
	text-transform: uppercase;
	letter-spacing: 1px;
}

.team-name {
	font-size: 1.5rem;
	font-weight: 700;
	color: #2c3e50;
	margin-bottom: 0;
}

.action-buttons {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.75rem;
	padding: 1.25rem;
}

.action-btn {
	padding: 0.875rem;
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

.details-btn:hover {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-color: transparent;
	color: white;
}

.players-btn:hover {
	background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
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
	.teams-container {
		padding: 1rem;
	}

	.page-title {
		font-size: 2rem;
		flex-direction: column;
	}

	.teams-grid {
		grid-template-columns: 1fr;
	}

	.team-logo {
		width: 100px;
		height: 100px;
	}

	.action-buttons {
		grid-template-columns: 1fr;
	}
}
</style>