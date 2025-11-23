const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*", // Allow all origins on local network
    methods: ["GET", "POST"],
    credentials: true
  }
});
const port = process.env.PORT || 3000;

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

server.listen(port, '0.0.0.0', () => {
  console.log('Server listening at port %d on all network interfaces', port);
});