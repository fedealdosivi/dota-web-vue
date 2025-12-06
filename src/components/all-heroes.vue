<template>
	<div class="heroes-container">
		<div class="heroes-header">
			<h1 class="page-title">
				<span class="title-icon">🦸</span>
				Heroes Gallery
			</h1>
			<p class="subtitle">Discover all Dota 2 heroes and their statistics</p>
		</div>

		<!-- Search Bar -->
		<div class="box search-card">
			<div class="search-wrapper">
				<span class="search-icon">🔍</span>
				<b-input
					v-model="heroFilter"
					type="text"
					placeholder="Search by name, attribute, attack type..."
					class="modern-search-input"
				></b-input>
				<span v-if="heroFilter" class="clear-btn" @click="heroFilter = ''">✕</span>
			</div>
			<div v-if="heroFilter && heroesFilter.length > 0" class="results-count">
				Found {{ heroesFilter.length }} hero{{ heroesFilter.length !== 1 ? 'es' : '' }}
			</div>
		</div>

		<!-- Loading State -->
		<b-loading :active="loading" :is-full-page="false"></b-loading>

		<!-- Empty State -->
		<div v-if="!loading && (!heroes || heroes.length < 1)" class="empty-state">
			<div class="empty-icon">🎯</div>
			<h3>No heroes found</h3>
			<p>Try adjusting your search criteria</p>
		</div>

		<!-- Heroes Grid -->
		<transition-group v-else-if="!loading" name="fade-slide" tag="div" class="heroes-grid">
			<div
				v-for="h in heroesFilter"
				:key="h.id"
				class="box hero-card"
			>
				<!-- Hero Header -->
				<div class="hero-header">
					<h3 class="hero-name">{{ h.localized_name }}</h3>
					<div class="hero-badges">
						<b-tag :class="['attribute-badge', getAttributeClass(h.primary_attr)]">
							{{ getAttributeIcon(h.primary_attr) }} {{ h.primary_attr }}
						</b-tag>
						<b-tag :class="['attack-badge', getAttackClass(h.attack_type)]">
							{{ getAttackIcon(h.attack_type) }} {{ h.attack_type }}
						</b-tag>
					</div>
				</div>

				<!-- Roles Section -->
				<div class="roles-section">
					<div class="roles-label">
						<span class="label-icon">⚔️</span>
						Roles
					</div>
					<div class="roles-tags">
						<b-tag v-for="(role, index) in h.roles" :key="index" class="role-tag">
							{{ role }}
						</b-tag>
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="action-buttons">
					<b-button
						tag="a"
						:href="'#/heroes/'+ h.id + '/matches/'"
						class="action-btn matches-btn"
					>
						<span class="btn-icon">🎮</span>
						<span class="btn-label">Matches</span>
					</b-button>
					<b-button
						tag="a"
						:href="'#/heroes/'+ h.id + '/players/'"
						class="action-btn players-btn"
					>
						<span class="btn-icon">👥</span>
						<span class="btn-label">Players</span>
					</b-button>
					<b-button
						tag="a"
						:href="'#/heroes/'+ h.id + '/rankings/'"
						class="action-btn rankings-btn"
					>
						<span class="btn-icon">🏆</span>
						<span class="btn-label">Rankings</span>
					</b-button>
					<b-button
						tag="a"
						:href="'#/heroes/'+ h.id + '/durations/'"
						class="action-btn durations-btn"
					>
						<span class="btn-icon">⏱️</span>
						<span class="btn-label">Durations</span>
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
				heroFilter: '',
				heroes: [],
				loading: false
			}
		},

		computed: {
			heroesFilter() {
				return this.heroes.filter(h =>
					h.localized_name.toLowerCase().indexOf(this.heroFilter.toLowerCase()) >= 0 ||
					h.primary_attr.toLowerCase().indexOf(this.heroFilter.toLowerCase()) >= 0 ||
					h.attack_type.toLowerCase().indexOf(this.heroFilter.toLowerCase()) >= 0
				);
			}
		},

		created() {
			this.getHeroes();
		},

		methods: {
			getHeroes() {
				this.loading = true;
				heroeService.getHeroStats()
					.then((response) => {
						this.heroes = response.data;
						this.loading = false;
					})
					.catch(() => {
						this.heroes = [];
						this.loading = false;
					})
			},

			getAttributeClass(attr) {
				const attrLower = attr.toLowerCase();
				if (attrLower === 'str' || attrLower === 'strength') return 'strength';
				if (attrLower === 'agi' || attrLower === 'agility') return 'agility';
				if (attrLower === 'int' || attrLower === 'intelligence') return 'intelligence';
				return 'default';
			},

			getAttributeIcon(attr) {
				const attrLower = attr.toLowerCase();
				if (attrLower === 'str' || attrLower === 'strength') return '💪';
				if (attrLower === 'agi' || attrLower === 'agility') return '⚡';
				if (attrLower === 'int' || attrLower === 'intelligence') return '🧠';
				return '⭐';
			},

			getAttackClass(attackType) {
				const typeLower = attackType.toLowerCase();
				if (typeLower === 'melee') return 'melee';
				if (typeLower === 'ranged') return 'ranged';
				return 'default';
			},

			getAttackIcon(attackType) {
				const typeLower = attackType.toLowerCase();
				if (typeLower === 'melee') return '⚔️';
				if (typeLower === 'ranged') return '🏹';
				return '🎯';
			}
		}
	}
</script>

<style scoped>
.heroes-container {
	max-width: 1400px;
	margin: 0 auto;
	padding: 2rem;
	position: relative;
}

.heroes-header {
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
	color: var(--dota-text-muted);
	font-size: 1.1rem;
}

.search-card {
	margin-bottom: 2rem;
	border-radius: 16px;
}

.search-wrapper {
	position: relative;
	display: flex;
	align-items: center;
	gap: 1rem;
}

.search-icon {
	font-size: 1.5rem;
	color: var(--dota-text-muted);
}

.modern-search-input {
	flex: 1;
}

.clear-btn {
	position: absolute;
	right: 1rem;
	font-size: 1.2rem;
	color: var(--dota-text-muted);
	cursor: pointer;
	transition: color 0.3s ease;
	padding: 0.25rem 0.5rem;
}

.clear-btn:hover {
	color: var(--dota-primary);
}

.results-count {
	margin-top: 1rem;
	text-align: center;
	color: var(--dota-primary);
	font-weight: 600;
	font-size: 0.95rem;
}

.empty-state {
	text-align: center;
	padding: 4rem 2rem;
	background: var(--dota-bg-medium);
	border: 1px solid var(--dota-border);
	border-radius: 16px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.empty-state h3 {
	color: var(--dota-text-primary);
	margin-bottom: 1rem;
	font-size: 1.5rem;
}

.empty-state p {
	color: var(--dota-text-muted);
	font-size: 1rem;
}

.empty-icon {
	font-size: 5rem;
	margin-bottom: 1.5rem;
}

.heroes-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
	gap: 1.5rem;
}

.hero-card {
	border-radius: 16px;
	border: 1px solid #dbdbdb;
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
	padding-bottom: 1rem;
	border-bottom: 2px solid var(--dota-border);
}

.hero-name {
	font-size: 1.6rem;
	font-weight: 800;
	color: var(--dota-text-primary);
	margin-bottom: 1rem;
	text-align: center;
}

.hero-badges {
	display: flex;
	gap: 0.5rem;
	justify-content: center;
	flex-wrap: wrap;
}

.attribute-badge,
.attack-badge {
	font-weight: 600;
	font-size: 0.85rem;
	text-transform: uppercase;
	letter-spacing: 0.5px;
}

.attribute-badge.strength {
	background: linear-gradient(135deg, #d63031 0%, #ff7675 100%);
	color: white;
	border: none;
}

.attribute-badge.agility {
	background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
	color: white;
	border: none;
}

.attribute-badge.intelligence {
	background: linear-gradient(135deg, #0984e3 0%, #74b9ff 100%);
	color: white;
	border: none;
}

.attribute-badge.default {
	background: linear-gradient(135deg, #7a7a7a 0%, #adb5bd 100%);
	color: white;
	border: none;
}

.attack-badge.melee {
	background: linear-gradient(135deg, #e17055 0%, #fab1a0 100%);
	color: white;
	border: none;
}

.attack-badge.ranged {
	background: linear-gradient(135deg, #a29bfe 0%, #dfe6e9 100%);
	color: #2c3e50;
	border: none;
}

.attack-badge.default {
	background: linear-gradient(135deg, #b2bec3 0%, #dfe6e9 100%);
	color: #2c3e50;
	border: none;
}

.roles-section {
	margin-bottom: 1.5rem;
}

.roles-label {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: var(--dota-text-muted);
	font-size: 0.85rem;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	font-weight: 600;
	margin-bottom: 0.75rem;
}

.label-icon {
	font-size: 1rem;
}

.roles-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
}

.role-tag {
	background: var(--dota-bg-dark);
	color: var(--dota-text-primary);
	border: 1px solid var(--dota-border);
}

.action-buttons {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.75rem;
}

.action-btn {
	border-radius: 12px;
	background: white;
	border: 2px solid #dbdbdb;
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

.matches-btn:hover {
	background: linear-gradient(135deg, #7957d5 0%, #8e44ad 100%);
	border-color: transparent;
	color: white;
}

.players-btn:hover {
	background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
	border-color: transparent;
	color: white;
}

.rankings-btn:hover {
	background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
	border-color: transparent;
	color: #2c3e50;
}

.durations-btn:hover {
	background: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%);
	border-color: transparent;
	color: white;
}

.btn-icon {
	font-size: 1.1rem;
}

.btn-label {
	font-size: 0.9rem;
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
	}

	.heroes-grid {
		grid-template-columns: 1fr;
	}

	.search-wrapper {
		flex-direction: column;
		align-items: stretch;
	}

	.action-buttons {
		grid-template-columns: 1fr;
	}
}
</style>
