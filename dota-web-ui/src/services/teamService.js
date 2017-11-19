import axios from 'axios';
export default {

	data(){
		return {   			
		}
	},

	getTeams(){
		const promise=axios.get('https://api.opendota.com/api/teams');
		return promise;
	},

	getTeamById(idTeam){
		const promise=axios.get('https://api.opendota.com/api/teams/' + idTeam);
		return promise;
	},

	getTeamMatchesById(idTeam){
		const promise=axios.get('https://api.opendota.com/api/teams/' + idTeam +'/matches');
		return promise;
	},

	getTeamPlayersById(idTeam){
		const promise=axios.get('https://api.opendota.com/api/teams/' + idTeam +'/players');
		return promise;
	},


	getTeamHeroesById(idTeam){
		const promise=axios.get('https://api.opendota.com/api/teams/' + idTeam +'/heroes');
		return promise;
	}

}