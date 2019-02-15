<template>
  <div class="discussion" v-if="discussion">
    <div class="hero">
      <div class="hero-body">

        <ul class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Coop</a>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/Discussions">Discussions</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link :to="{name:'Discussion',params:{id:discussion._id}}">{{ discussion.topic }}</router-link>
          </li>
        </ul>        

        <h1>{{ discussion.topic }} <small class="label">{{ discussion.label }}</small></h1>
        <p>
          <small>
          </small>
        </p>


        <div class="messages">
          <message v-for="message in messages" :message="message"/>
        </div>


        <form @submit.prevent="envoyerMessage" class="envoyer-message input-group">
          <span class="input-group-addon">Message</span>
          <input class="form-input" v-model="message" placeholder="Ecrivez votre message ici ...">
          <button class="btn btn-primary input-group-btn">Envoyer</button>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import Message from '@/views/Message.vue';
export default {
  components : {Message},
  name: 'Discussion',
  data() {
  	return {
      discussion : false,
      messages : [],
      message : ''
    }
  },
  mounted() {
    this.$bus.$on('chargerMessages',() => {
      this.chargerMessages();
    });

    window.axios.get('channels/'+this.$route.params.id).then(response => {
      this.discussion = response.data;
      if(this.discussion.posts) {
        this.messages = this.discussion.posts;
      }
      setInterval(this.chargerEtScroller,1000);
    });
  },
  methods : {
    chargerEtScroller() {
      this.chargerMessages(() => {
        this.scrollToBottom();            
      });

    },
    chargerMessages(callback=false) {
      window.axios.get('channels/'+this.discussion._id+'/posts').then((response) => {
        if(response.data.length != this.messages.length)  {
          this.messages = response.data;
          if(callback) {
            callback();
          }
        }
      })

    },
    envoyerMessage() {
      window.axios.post('channels/'+this.discussion._id+'/posts',{
        message : this.message
      }).then(response => {
        this.chargerEtScroller();
        this.message='';
      });
    }
  }

};
</script>

<style scoped>
.hero {
  padding-bottom: 1rem
}
.envoyer-message {
  position: fixed;
  bottom: 0;
  transform: translateX(-50%);
  left: 50%;
  width:100%;
  max-width: 1000px;
  z-index: 1000
}
</style>
