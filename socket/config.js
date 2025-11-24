/**
 * Chat Configuration
 *
 * Adjust these settings to control message retention and other chat features
 */

module.exports = {
  // Message retention period in hours
  // Default: 24 hours
  // You can change this to any value:
  //   - 1 hour: retentionHours: 1
  //   - 12 hours: retentionHours: 12
  //   - 48 hours: retentionHours: 48
  //   - 7 days: retentionHours: 168
  //   - 30 days: retentionHours: 720
  retentionHours: 24,

  // Cleanup interval in milliseconds
  // Default: 1 hour (3600000 ms)
  // How often the system checks for and removes expired messages
  cleanupIntervalMs: 60 * 60 * 1000, // 1 hour

  // Storage file location
  // Default: './messages.json' (in the socket directory)
  storageFile: require('path').join(__dirname, 'messages.json'),

  // Server port
  port: process.env.PORT || 3000
};
