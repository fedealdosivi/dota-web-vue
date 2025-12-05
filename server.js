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
const MessageStorage = require('./socket/messageStorage');
const config = require('./socket/config');

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Initialize message storage with configured retention period
const messageStorage = new MessageStorage({
  retentionHours: config.retentionHours,
  storageFile: config.storageFile
});

// Socket.IO connection handling
io.on('connection', function(socket) {
  console.log('A user connected');

  // Send existing messages to newly connected client
  const existingMessages = messageStorage.getMessages();
  socket.emit('loadHistory', existingMessages);
  console.log(`Sent ${existingMessages.length} historical messages to client`);

  socket.on('chat_message', function(payload) {
    // Store the message
    const savedMessage = messageStorage.addMessage(payload);

    // Broadcast to all clients including sender
    io.emit('receiveMessage', savedMessage);
  });

  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  messageStorage.destroy();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  messageStorage.destroy();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
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
  console.log(`Message retention period: ${messageStorage.getRetentionHours()} hours`);
});