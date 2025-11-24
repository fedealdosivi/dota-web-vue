<template>
	<div class="chat-container">
   <transition name="slide-fade">
      <b-card class="chat-card" no-body>
        <div class="chat-header">
          <h4 class="mb-0">
            <span class="chat-icon">💬</span>
            Live Chat
            <b-badge variant="success" pill class="ml-2">{{ onlineUsers }} online</b-badge>
          </h4>
        </div>

        <div class="messages-container" ref="messagesContainer">
          <div v-if="messages.length === 0" class="no-messages">
            <p class="text-muted">No messages yet. Be the first to say hello!</p>
          </div>
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="message-item"
            :class="{ 'own-message': message.user === user }"
          >
            <div class="message-avatar">
              {{ message.user.charAt(0).toUpperCase() }}
            </div>
            <div class="message-content">
              <div class="message-header">
                <span class="message-user">{{ message.user }}</span>
                <span class="message-time">{{ formatTime(message.timestamp) }}</span>
              </div>
              <div class="message-text">{{ message.newMessage }}</div>
            </div>
          </div>
        </div>

        <div class="chat-input-container">
          <b-form @submit.prevent="sendMessage" class="d-flex">
            <b-input
              v-model="user"
              placeholder="Your name"
              class="username-input"
              :disabled="usernameLocked"
            />
            <b-input
              v-model="newMessage"
              placeholder="Type your message..."
              class="message-input"
              @keyup.enter="sendMessage"
              autofocus
            />
            <b-button
              type="submit"
              :disabled="!formOk"
              variant="primary"
              class="send-button"
            >
              <span v-if="!formOk">✉️</span>
              <span v-else>Send</span>
            </b-button>
          </b-form>
        </div>
      </b-card>
   </transition>
  </div>
</template>
<script>
import { SocketInstance } from '../main';

export default {
  data() {
    return {
      socket: SocketInstance,
      newMessage: '',
      user: localStorage.getItem('chatUsername') || '',
      usernameLocked: false,
      messages: [],
      onlineUsers: 1
    }
  },

  sockets: {
    connect: function(){
      console.log('Socket connected')
      this.onlineUsers = Math.floor(Math.random() * 10) + 1; // Simulated for now
    },
    loadHistory(messages) {
      // Load historical messages when connecting
      console.log(`Loaded ${messages.length} historical messages`);
      this.messages = messages;
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    receiveMessage(message) {
      // Add timestamp if not present
      if (!message.timestamp) {
        message.timestamp = new Date();
      }
      this.messages.push(message);
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    }
  },

  methods: {
    sendMessage() {
      if (!this.formOk) return;

      const payload = {
        user: this.user,
        newMessage: this.newMessage,
        timestamp: new Date()
      }

      // Lock username after first message
      if (!this.usernameLocked && this.user) {
        this.usernameLocked = true;
        localStorage.setItem('chatUsername', this.user);
      }

      this.socket.emit('chat_message', payload);
      this.newMessage = '';
    },

    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },

    formatTime(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  },

  computed: {
    formOk() {
      return this.newMessage && this.user;
    }
  },

  mounted() {
    this.scrollToBottom();

    // Ensure we request history if socket is already connected
    if (this.socket && this.socket.connected) {
      console.log('Socket already connected, messages should load automatically');
    }
  }
}
</script>
<style scoped>
.chat-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.chat-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  height: 600px;
  display: flex;
  flex-direction: column;
}

.chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.chat-icon {
  font-size: 1.2em;
  margin-right: 8px;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.messages-container::-webkit-scrollbar {
  width: 8px;
}

.messages-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.messages-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.no-messages {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.1em;
}

.message-item {
  display: flex;
  gap: 12px;
  animation: slideIn 0.3s ease-out;
}

.message-item.own-message {
  flex-direction: row-reverse;
}

.message-item.own-message .message-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.message-item.own-message .message-user {
  color: rgba(255, 255, 255, 0.9);
}

.message-item.own-message .message-time {
  color: rgba(255, 255, 255, 0.7);
}

.message-item.own-message .message-avatar {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1em;
  flex-shrink: 0;
}

.message-content {
  background: white;
  padding: 12px 16px;
  border-radius: 12px;
  max-width: 70%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  gap: 12px;
}

.message-user {
  font-weight: 600;
  font-size: 0.9em;
  color: #667eea;
}

.message-time {
  font-size: 0.75em;
  color: #999;
}

.message-text {
  word-wrap: break-word;
  line-height: 1.5;
}

.chat-input-container {
  padding: 16px;
  background: white;
  border-top: 1px solid #e9ecef;
}

.chat-input-container form {
  gap: 8px;
}

.username-input {
  flex: 0 0 140px;
  border-radius: 8px;
}

.message-input {
  flex: 1;
  border-radius: 8px;
}

.send-button {
  border-radius: 8px;
  padding: 0.375rem 1.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.send-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.send-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

@media (max-width: 768px) {
  .chat-container {
    padding: 10px;
  }

  .chat-card {
    height: calc(100vh - 20px);
    border-radius: 12px;
  }

  .username-input {
    flex: 0 0 100px;
  }

  .message-content {
    max-width: 85%;
  }

  .send-button {
    padding: 0.375rem 1rem;
  }
}
</style>