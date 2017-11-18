  <template>
  <div v-if="player!=null">
      <b-card tag="article" style="max-width: 20rem;" class="mb-2">
        <h3>{{this.player.profile.personaname}}</h3>
        <p class="card-text">Steam ID: {{this.player.profile.steamid}}</p>
        <p class="card-text">MMR points: {{this.player.mmr_estimate.estimate}}</p>
      </b-card>
  </div>
  <h2 v-else>Looks so empty</h2>

  </template>

  <script>
    import playerService from '../services/playerService';
    export default {
     name: 'playerProfile',
     props: ['vista'],
     data() {
      return {   			
       player :{
        tracked_until: '',
        solo_competitive_rank: '',
        competitive_rank: '',
        mmr_estimate: {
          estimate: 0,
          stdDev: 0,
          n: 0
        },
        profile: {
          account_id: 0,
          personaname: '',
          name: '',
          cheese: 0,
          steamid: '',
          avatar: '',
          avatarmedium: '',
          avatarfull: '',
          profileurl: '',
          last_login: '',
          loccountrycode: ''
        }
      },
      mensaje:false
    }
  },

  computed:{
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
     this.player=this.getPlayer();
   }
  },	

  created() {
   this.player=this.getPlayer();
  },

  methods: {

    getPlayer(){
      playerService.getPlayerById(this.id)
      .then((response) => {
                      this.player = response.data;
                  })
                  .catch((error) => {
                      this.player='';
                  })
                }
    }
  }
  </script>