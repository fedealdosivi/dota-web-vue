const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*", // Allow all origins on local network
    methods: ["GET", "POST"],
    credentials: true
  }
});
const MessageStorage = require('./messageStorage');
const config = require('./config');

// Initialize message storage with configured retention period
// To change retention period, edit socket/config.js
const messageStorage = new MessageStorage({
  retentionHours: config.retentionHours,
  storageFile: config.storageFile
});

io.on('connection', function(socket) {
	console.log('A user connected');

	// Send existing messages to newly connected client
	const existingMessages = messageStorage.getMessages();
	socket.emit('loadHistory', existingMessages);
	console.log(`Sent ${existingMessages.length} historical messages to client`);

	// Allow clients to request history at any time (e.g., when navigating to chat page)
	socket.on('requestHistory', function() {
		const messages = messageStorage.getMessages();
		socket.emit('loadHistory', messages);
		console.log(`Sent ${messages.length} historical messages on request`);
	});

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

server.listen(config.port, '0.0.0.0', () => {
  console.log('Server listening at port %d on all network interfaces', config.port);
  console.log(`Message retention period: ${messageStorage.getRetentionHours()} hours`);
});