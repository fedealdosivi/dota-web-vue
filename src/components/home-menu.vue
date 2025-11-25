<template>
  <div class="home-container">
    <div class="hero-section">
      <h1 class="hero-title">
        <span class="title-icon">⚔️</span>
        Dota 2 Stats
      </h1>
      <p class="hero-subtitle">
        Explore player statistics, hero rankings, team information, and chat with the community
      </p>
    </div>

    <b-carousel
      class="modern-carousel"
      :autoplay="true"
      :interval="5000"
      :indicator="true"
      :arrow="true"
      :arrow-hover="true"
      v-model="slide"
    >
      <!-- Intro Slide -->
      <b-carousel-item>
        <div class="slide-wrapper intro-slide">
          <div class="slide-overlay"></div>
          <img
            src="http://esports.inquirer.net/wp-content/uploads/2016/10/22.jpg"
            alt="Dota 2"
            class="slide-bg-img"
          />
          <div class="slide-content">
            <h2 class="slide-title">Welcome to Dota Stats</h2>
            <p class="slide-text">
              Dota 2 is a free-to-play multiplayer online battle arena video game developed and published by Valve Corporation.
            </p>
            <div class="slide-badge">
              <span class="badge-icon">🎮</span>
              Explore Stats
            </div>
          </div>
        </div>
      </b-carousel-item>

      <!-- Players Slide -->
      <b-carousel-item>
        <div class="slide-wrapper players-slide">
          <div class="slide-overlay"></div>
          <img
            src="https://i.redd.it/5csw96tgafjy.jpg"
            alt="Players"
            class="slide-bg-img"
          />
          <div class="slide-content">
            <h2 class="slide-title">
              <span class="slide-icon">👥</span>
              Players
            </h2>
            <p class="slide-text">
              Search for players and discover their comprehensive statistics, match history, and performance metrics
            </p>
            <b-button tag="a" href="/#/player" type="is-white is-light" size="is-large" class="slide-cta">
              Explore Players
              <span class="cta-arrow">→</span>
            </b-button>
          </div>
        </div>
      </b-carousel-item>

      <!-- Heroes Slide -->
      <b-carousel-item>
        <div class="slide-wrapper heroes-slide">
          <div class="slide-overlay"></div>
          <img
            src="http://wallpapersdsc.net/wp-content/uploads/2015/11/Dota_2_Iphone_wallpapers14.jpg"
            alt="Heroes"
            class="slide-bg-img"
          />
          <div class="slide-content">
            <h2 class="slide-title">
              <span class="slide-icon">🦸</span>
              Heroes
            </h2>
            <p class="slide-text">
              Discover hero statistics, rankings, and find out which players excel with each character
            </p>
            <b-button tag="a" href="/#/heroes" type="is-white is-light" size="is-large" class="slide-cta">
              Browse Heroes
              <span class="cta-arrow">→</span>
            </b-button>
          </div>
        </div>
      </b-carousel-item>

      <!-- Teams Slide -->
      <b-carousel-item>
        <div class="slide-wrapper teams-slide">
          <div class="slide-overlay"></div>
          <img
            src="https://images2.alphacoders.com/466/thumb-1920-466303.jpg"
            alt="Teams"
            class="slide-bg-img"
          />
          <div class="slide-content">
            <h2 class="slide-title">
              <span class="slide-icon">🛡️</span>
              Teams
            </h2>
            <p class="slide-text">
              Explore professional teams, their rosters, and tournament performance
            </p>
            <b-button tag="a" href="/#/teams" type="is-white is-light" size="is-large" class="slide-cta">
              View Teams
              <span class="cta-arrow">→</span>
            </b-button>
          </div>
        </div>
      </b-carousel-item>

      <!-- Chat Slide -->
      <b-carousel-item>
        <div class="slide-wrapper chat-slide">
          <div class="slide-overlay"></div>
          <img
            src="https://wallpaperscraft.com/image/dota_2_chibi_heroes_art_93793_1920x1080.jpg"
            alt="Chat"
            class="slide-bg-img"
          />
          <div class="slide-content">
            <h2 class="slide-title">
              <span class="slide-icon">💬</span>
              Live Chat
            </h2>
            <p class="slide-text">
              Connect and chat in real-time with other Dota 2 players from around the world
            </p>
            <b-button tag="a" href="/#/chat" type="is-white is-light" size="is-large" class="slide-cta chat-cta">
              Join Chat
              <span class="cta-arrow">→</span>
            </b-button>
          </div>
        </div>
      </b-carousel-item>
    </b-carousel>

    <div class="features-grid">
      <div class="feature-card box">
        <div class="feature-icon">📊</div>
        <h3>Detailed Stats</h3>
        <p>In-depth analytics and performance metrics</p>
      </div>
      <div class="feature-card box">
        <div class="feature-icon">🏆</div>
        <h3>Rankings</h3>
        <p>Track top players and hero rankings</p>
      </div>
      <div class="feature-card box">
        <div class="feature-icon">🔄</div>
        <h3>Real-time Updates</h3>
        <p>Stay updated with live data</p>
      </div>
      <div class="feature-card box">
        <div class="feature-icon">🌐</div>
        <h3>Community</h3>
        <p>Connect with players worldwide</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 0
    }
  }
}
</script>

<style scoped>
.home-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #7957d5 0%, #8e44ad 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-icon {
  font-size: 3.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.hero-subtitle {
  font-size: 1.3rem;
  color: #7a7a7a;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.modern-carousel {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  margin-bottom: 3rem;
  height: 500px;
}

.slide-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.slide-bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(121, 87, 213, 0.8) 0%, rgba(142, 68, 173, 0.8) 100%);
  opacity: 0.7;
}

.slide-content {
  position: relative;
  z-index: 10;
  text-align: center;
  color: white;
  padding: 2rem;
  max-width: 700px;
}

.slide-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.slide-icon {
  font-size: 3rem;
}

.slide-text {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.6;
}

.slide-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.3rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.badge-icon {
  font-size: 1.5rem;
}

.slide-cta {
  border-radius: 50px !important;
  font-weight: 700 !important;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
  transition: all 0.3s ease !important;
}

.slide-cta:hover {
  transform: translateY(-4px) scale(1.05) !important;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3) !important;
}

.chat-cta {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
  color: white !important;
  border: none !important;
}

.cta-arrow {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.slide-cta:hover .cta-arrow {
  transform: translateX(5px);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.feature-card p {
  color: #7a7a7a;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .home-container {
    padding: 1rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .title-icon {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .modern-carousel,
  .slide-wrapper {
    height: 400px;
  }

  .slide-title {
    font-size: 2rem;
  }

  .slide-icon {
    font-size: 2rem;
  }

  .slide-text {
    font-size: 1.1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
