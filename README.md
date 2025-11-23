# Dota 2 Stats Web Application

**Production**: https://dota-web-vue.onrender.com

## Features

- **Player Statistics**: 
- **Team Information**: 
- **Hero Data**: 
- **Match Details**: 
- **Real-time Chat**: 
- **Modern UI/UX**: 
- **Responsive Design**: 

## Tech Stack

### Frontend
- **Vue.js 2.7** - Progressive JavaScript framework
- **Vue Router 3.6** - Client-side routing
- **Bootstrap 4.6** - UI component library
- **Bootstrap Vue 2.23** - Vue components for Bootstrap
- **Axios** - HTTP client for API requests
- **Socket.IO Client 4.6** - Real-time bidirectional communication

### Backend
- **Express 4.18** - Web server framework
- **Socket.IO 4.6** - Real-time engine
- **Node.js** - JavaScript runtime

### Build Tools
- **Webpack 5** - Module bundler
- **Babel 7** - JavaScript compiler
- **PostCSS** - CSS transformations

## Getting Started

### Prerequisites

- Node.js >= 4.0.0
- npm >= 3.0.0

# Install dependencies
npm install
```

### Development

The development setup runs both the Vue dev server and Socket.IO server concurrently:

```bash
# Start both Vue dev server (port 8080) and Socket.IO server (port 3000)
npm run dev
```

This will start:
- **Vue Dev Server**: http://localhost:8080
- **Socket.IO Server**: http://localhost:3000

#### Run Servers Separately (if needed)

```bash
# Run only Vue dev server
npm run dev:webpack

# Run only Socket.IO server
npm run dev:socket
```

### Production Build

```bash
# Build for production
npm run build

# Start production server (serves built files + Socket.IO)
npm start
```

The production server runs on port 5000 (or PORT environment variable) and serves both the static Vue app and Socket.IO on the same port.

### Build with Bundle Analyzer

```bash
# Build and view bundle size analysis
npm run build --report
```

## Deployment

This project is configured for easy deployment to Render.com (free tier available).

## API Integration

The application integrates with the OpenDota API for fetching Dota 2 statistics. API service modules are located in `docs.opendota.com/`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE 9+ (with polyfills)

## License

This project is private.

## Author

Federico Palomero Garcia - fedepalo13@gmail.com

## Acknowledgments

- OpenDota API for Dota 2 data
- Vue.js community
- Bootstrap Vue team
- Socket.IO team
