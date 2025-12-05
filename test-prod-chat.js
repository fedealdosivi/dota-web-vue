// Test script for production chat persistence
const io = require('socket.io-client');

const socket = io('http://localhost:5001');

socket.on('connect', () => {
  console.log('✓ Connected to PRODUCTION server');

  socket.on('loadHistory', (messages) => {
    console.log(`✓ Received ${messages.length} historical messages from production:`);
    messages.forEach(msg => {
      console.log(`  - ${msg.user}: ${msg.newMessage}`);
    });

    console.log('\n✓ Production chat persistence is working!');
    socket.disconnect();
    process.exit(0);
  });
});

socket.on('connect_error', (error) => {
  console.error('✗ Connection error:', error.message);
  process.exit(1);
});

setTimeout(() => {
  console.error('✗ Test timed out');
  process.exit(1);
}, 5000);