import axios from 'axios';
export default {

	data(){
		return {   			
		}
	},

	getPlayerById(playerId){
		const promise=axios.get('https://api.opendota.com/api/players/'+ playerId);
		return promise;
	}
}