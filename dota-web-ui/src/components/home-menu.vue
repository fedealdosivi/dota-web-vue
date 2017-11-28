<template>
  <div>
    <transition name="bounce">
      <div class="container">
        <h2>Foro bardo</h2>
        <div class="card blue-grey darken-1">

            <div class="card-content">
              <h5> {{ showUser }} </h5>
              <div class="chatbox"> 
                  <ul>
                    <li v-for="message in messages" class="chip"> 
                      <b>{{ message.userP }}<label>:</label></b> {{ message.newMessageP }} 
                    </li>
                  </ul>
              </div>
              <br>
              <form class="align-bottom">
                  <input v-model="user" type='text' placeholder="User name"/>
                  <input v-model="newMessage" autocomplete="off" placeholder="Your message..." />
                  <button :disabled="!formOk" class="btn pad" @click.prevent="sendMessage">Send</button>
              </form>
            </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      socket: {},
      newMessage: '',
      user: '',
      send: {},
      messages: [],
      showUser: ''
    }
  },
    sockets: {
      connect: function(){
        console.log('Sockete connected')
      },
      receiveMessage(message) {
        this.messages.push(message);
      }
    },

    methods: {
      sendMessage() {
        const payload = {
          userP : this.user,
          newMessageP : this.newMessage
        }
        this.socket.emit('chat_message', payload);
        this.newMessage = '';
        this.showUser = 'You are ' + this.user;
      }
    },

    computed:{
      formOk() {
        return this.newMessage && this.user;
      }
    },

    created() {
      this.socket = io('http://localhost:3000');
    }
}
</script>
<style>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {

    body{
      background-color: black;
    }
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>