<template>
	<div class="durations-container">
		<div class="durations-header">
			<h1 class="page-title">
				<span class="title-icon">⏱️</span>
				Hero Durations
			</h1>
			<p class="subtitle">Match duration statistics for this hero</p>
		</div>

		<b-loading :active="loading" :is-full-page="false"></b-loading>

		<div v-if="!loading && (!durations || durations.length < 1)" class="empty-state">
			<div class="empty-icon">📊</div>
			<h3>No data available</h3>
			<p>Duration statistics are not available for this hero</p>
		</div>

		<div v-else-if="!loading" class="box table-container">
			<b-table
				:data="durations"
				:striped="true"
				:hoverable="true"
				:mobile-cards="true"
			>
				<b-table-column field="duration_bin" label="Duration Range" centered v-slot="props">
					<b-tag class="duration-badge">{{ formatDuration(props.row.duration_bin) }}</b-tag>
				</b-table-column>
				<b-table-column field="games_played" label="Games Played" centered numeric v-slot="props">
					<span class="stat-value games">{{ props.row.games_played }}</span>
				</b-table-column>
				<b-table-column field="wins" label="Wins" centered numeric v-slot="props">
					<span class="stat-value wins">{{ props.row.wins }}</span>
				</b-table-column>
			</b-table>
		</div>
	</div>
</template>

<script>
	import heroeService from '../services/heroeService';
	export default {
		data() {
			return {
				durations: [],
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
				this.getDurations(this.id);
			}
		},

		created() {
			this.getDurations(this.id);
		},

		methods: {
			getDurations() {
				this.loading = true;
				heroeService.getDurationHeroeById(this.id)
					.then((response) => {
						this.durations = response.data;
						this.loading = false;
					})
					.catch(() => {
						this.durations = [];
						this.loading = false;
					})
			},

			formatDuration(bin) {
				if (!bin) return 'N/A';
				const minutes = Math.floor(bin / 60);
				return `${minutes} min`;
			}
		}
	}
</script>

<style scoped>
.durations-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem;
	position: relative;
}

.durations-header {
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

.table-container {
	border-radius: 16px;
	border: 1px solid #dbdbdb;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.duration-badge {
	background: linear-gradient(135deg, #7957d5 0%, #8e44ad 100%);
	color: white;
	font-weight: 600;
	font-size: 0.95rem;
	border: none;
}

.stat-value {
	font-size: 1.3rem;
	font-weight: 800;
	padding: 0.25rem 0.75rem;
	border-radius: 8px;
}

.stat-value.games {
	color: #7957d5;
	background: rgba(121, 87, 213, 0.1);
}

.stat-value.wins {
	color: #00b894;
	background: rgba(0, 184, 148, 0.1);
}

@media (max-width: 768px) {
	.durations-container {
		padding: 1rem;
	}

	.page-title {
		font-size: 2rem;
		flex-direction: column;
	}

	.table-container {
		padding: 1rem;
	}
}
</style>
