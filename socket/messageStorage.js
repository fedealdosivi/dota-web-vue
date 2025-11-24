const fs = require('fs');
const path = require('path');

class MessageStorage {
  constructor(options = {}) {
    // Configurable retention period in hours (default: 24)
    this.retentionHours = options.retentionHours || 24;
    this.storageFile = options.storageFile || path.join(__dirname, 'messages.json');
    this.messages = [];
    this.loadMessages();

    // Auto-cleanup every hour
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60 * 60 * 1000); // Every hour
  }

  /**
   * Load messages from file
   */
  loadMessages() {
    try {
      if (fs.existsSync(this.storageFile)) {
        const data = fs.readFileSync(this.storageFile, 'utf8');
        this.messages = JSON.parse(data);
        console.log(`Loaded ${this.messages.length} messages from storage`);
        // Clean up old messages on load
        this.cleanup();
      } else {
        console.log('No existing message storage found, starting fresh');
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      this.messages = [];
    }
  }

  /**
   * Save messages to file
   */
  saveMessages() {
    try {
      fs.writeFileSync(this.storageFile, JSON.stringify(this.messages, null, 2));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  }

  /**
   * Add a new message
   */
  addMessage(message) {
    const messageWithTimestamp = {
      ...message,
      timestamp: message.timestamp || new Date().toISOString(),
      id: Date.now() + Math.random() // Simple unique ID
    };

    this.messages.push(messageWithTimestamp);
    this.saveMessages();
    return messageWithTimestamp;
  }

  /**
   * Get all valid (non-expired) messages
   */
  getMessages() {
    return this.messages.filter(msg => !this.isExpired(msg));
  }

  /**
   * Check if a message is expired based on retention period
   */
  isExpired(message) {
    const messageTime = new Date(message.timestamp);
    const expiryTime = new Date(messageTime.getTime() + (this.retentionHours * 60 * 60 * 1000));
    return new Date() > expiryTime;
  }

  /**
   * Remove expired messages
   */
  cleanup() {
    const beforeCount = this.messages.length;
    this.messages = this.messages.filter(msg => !this.isExpired(msg));
    const afterCount = this.messages.length;

    if (beforeCount !== afterCount) {
      console.log(`Cleaned up ${beforeCount - afterCount} expired messages`);
      this.saveMessages();
    }
  }

  /**
   * Update retention period (in hours)
   */
  setRetentionHours(hours) {
    this.retentionHours = hours;
    console.log(`Retention period updated to ${hours} hours`);
    this.cleanup(); // Clean up with new retention period
  }

  /**
   * Get current retention period
   */
  getRetentionHours() {
    return this.retentionHours;
  }

  /**
   * Clear all messages
   */
  clearAll() {
    this.messages = [];
    this.saveMessages();
    console.log('All messages cleared');
  }

  /**
   * Cleanup on shutdown
   */
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.cleanup();
  }
}

module.exports = MessageStorage;
