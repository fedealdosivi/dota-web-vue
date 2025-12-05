<template>
	<div class="chat-container">
		<transition name="slide-fade">
			<div class="box chat-card">
				<div class="chat-header">
					<h4 class="title is-4 mb-0">
						<span class="chat-icon">💬</span>
						Live Chat
						<b-tag type="is-success" rounded class="ml-2">{{ onlineUsers }} online</b-tag>
					</h4>
				</div>

				<div class="messages-container" ref="messagesContainer">
					<div v-if="messages.length === 0" class="no-messages">
						<p class="has-text-grey">No messages yet. Be the first to say hello!</p>
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
					<b-field grouped>
						<b-input
							v-model="user"
							placeholder="Your name"
							:disabled="usernameLocked"
							class="username-input"
						/>
						<b-input
							v-model="newMessage"
							placeholder="Type your message..."
							expanded
							@keyup.native.enter="sendMessage"
						/>
						<p class="control">
							<b-button
								type="is-primary"
								:disabled="!formOk"
								@click="sendMessage"
								native-type="submit"
							>
								{{ !formOk ? '✉️' : 'Send' }}
							</b-button>
						</p>
					</b-field>
				</div>
			</div>
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
        timestamp: new Date().toISOString()
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

    // Request history when component mounts
    // This ensures users see messages even if they navigate to chat page
    // after the socket connection was already established
    if (this.socket) {
      if (this.socket.connected) {
        console.log('Socket already connected, requesting history...');
        this.socket.emit('requestHistory');
      } else {
        // If not connected yet, wait for connection then request
        this.socket.on('connect', () => {
          console.log('Socket connected, history will be sent automatically');
        });
      }
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
  height: 600px;
  display: flex;
  flex-direction: column;
  padding: 0 !important;
}

.chat-header {
  background: var(--dota-gradient-primary);
  color: white;
  padding: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.mb-0 {
  margin-bottom: 0 !important;
}

.ml-2 {
  margin-left: 0.5rem;
}

.chat-icon {
  font-size: 1.2em;
  margin-right: 8px;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: var(--dota-bg-dark);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.messages-container::-webkit-scrollbar {
  width: 8px;
}

.messages-container::-webkit-scrollbar-track {
  background: var(--dota-bg-darkest);
}

.messages-container::-webkit-scrollbar-thumb {
  background: var(--dota-bg-light);
  border-radius: 4px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: var(--dota-primary);
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
  background: var(--dota-gradient-primary);
  color: white;
}

.message-item.own-message .message-user {
  color: rgba(255, 255, 255, 0.9);
}

.message-item.own-message .message-time {
  color: rgba(255, 255, 255, 0.7);
}

.message-item.own-message .message-avatar {
  background: var(--dota-gradient-hero);
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--dota-accent-cyan) 0%, var(--dota-accent-teal) 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1em;
  flex-shrink: 0;
}

.message-content {
  background: var(--dota-bg-medium);
  padding: 12px 16px;
  border-radius: 12px;
  max-width: 70%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
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
  color: var(--dota-accent-orange);
}

.message-time {
  font-size: 0.75em;
  color: var(--dota-text-muted);
}

.message-text {
  word-wrap: break-word;
  line-height: 1.5;
}

.chat-input-container {
  padding: 16px;
  background: var(--dota-bg-medium);
  border-top: 1px solid var(--dota-border);
}

.username-input {
  max-width: 140px;
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
  }

  .username-input {
    max-width: 100px;
  }

  .message-content {
    max-width: 85%;
  }
}
</style>