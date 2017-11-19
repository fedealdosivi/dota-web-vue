import axios from 'axios';
export default {

	data(){
		return {   			
		}
	},

	getPublicMatches(){
		const promise=axios.get('https://api.opendota.com/api/publicMatches');
		return promise;
	},

	getMatchById(idMatch){
		const promise=axios.get('https://api.opendota.com/api/matches/'+idMatch);
		return promise;
	}


}