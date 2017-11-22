    <template>
      <div v-if="player!=null">
        <b-card  bg-variant="dark" text-variant="white">
          <h3 class="Card Title">{{this.player.profile.personaname}}</h3>
          <p class="card-text">Steam ID: {{this.player.profile.steamid}}</p>
          <p class="card-text">MMR points: {{this.player.mmr_estimate.estimate}}</p>
          <b-img right :src="this.player.profile.avatarfull" alt="right image" />
          <p>{{this.player.profile.avatarfull}}</p>
          <b-button :href="'#/player/'+ id +'/peers'" variant="primary">Discover Peers</b-button>
          <b-button :href="'#/player/'+ id + '/rmatches/'" variant="primary">See Recent Matches</b-button>
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
        player :{},
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