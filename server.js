// server.js
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Socket.IO connection handling
io.on('connection', function(socket) {
  console.log('A user connected');

  socket.on('chat_message', function(payload) {
    // Broadcast to all clients including sender
    io.emit('receiveMessage', payload);
  });

  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});

// Handle SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 5000;
server.listen(port, '0.0.0.0', () => {
  console.log('Server started on port ' + port);
  console.log('Socket.IO server is running');
});