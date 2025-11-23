<template>
	<div class="durations-container">
		<div class="durations-header">
			<h1 class="page-title">
				<span class="title-icon">⏱️</span>
				Hero Durations
			</h1>
			<p class="subtitle">Match duration statistics for this hero</p>
		</div>

		<div v-if="loading" class="loading-state">
			<div class="spinner"></div>
			<p>Loading duration statistics...</p>
		</div>

		<div v-else-if="!durations || durations.length < 1" class="empty-state">
			<div class="empty-icon">📊</div>
			<h3>No data available</h3>
			<p>Duration statistics are not available for this hero</p>
		</div>

		<div v-else class="table-container">
			<b-table
				:items="durations"
				:fields="tableFields"
				striped
				hover
				responsive
				class="modern-table"
			>
				<template #cell(duration_bin)="data">
					<span class="duration-badge">{{ formatDuration(data.value) }}</span>
				</template>
				<template #cell(games_played)="data">
					<span class="stat-value games">{{ data.value }}</span>
				</template>
				<template #cell(wins)="data">
					<span class="stat-value wins">{{ data.value }}</span>
				</template>
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
				loading: false,
				tableFields: [
					{ key: 'duration_bin', label: 'Duration Range', sortable: true, class: 'text-center' },
					{ key: 'games_played', label: 'Games Played', sortable: true, class: 'text-center' },
					{ key: 'wins', label: 'Wins', sortable: true, class: 'text-center' }
				]
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
}

.durations-header {
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

.table-container {
	background: white;
	border-radius: 16px;
	padding: 2rem;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.modern-table {
	margin-bottom: 0;
}

.modern-table >>> thead {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
}

.modern-table >>> thead th {
	border: none;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	font-size: 0.9rem;
	padding: 1rem;
}

.modern-table >>> tbody tr {
	transition: all 0.3s ease;
}

.modern-table >>> tbody tr:hover {
	background: #f8f9fa;
	transform: scale(1.01);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.modern-table >>> tbody td {
	padding: 1rem;
	vertical-align: middle;
	font-size: 1rem;
}

.duration-badge {
	display: inline-block;
	padding: 0.5rem 1rem;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	border-radius: 20px;
	font-weight: 600;
	font-size: 0.95rem;
}

.stat-value {
	font-size: 1.3rem;
	font-weight: 800;
	padding: 0.25rem 0.75rem;
	border-radius: 8px;
}

.stat-value.games {
	color: #667eea;
	background: rgba(102, 126, 234, 0.1);
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
		overflow-x: auto;
	}

	.modern-table >>> thead th,
	.modern-table >>> tbody td {
		padding: 0.75rem 0.5rem;
		font-size: 0.85rem;
	}
}
</style>