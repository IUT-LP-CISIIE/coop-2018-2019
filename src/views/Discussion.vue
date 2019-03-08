<template>
  <div class="discussion" v-if="discussion">
    <div class="hero">
      <div class="hero-body">
        <div class="fixed">
          <ul class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Coop</a>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/Discussions">Discussions</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link :to="{name:'Discussion',params:{id:discussion._id}}">{{ discussion.label }}</router-link>
            </li>
          </ul>        

          <h2>{{ discussion.label }} <small class="label"><code>{{ discussion.topic }}</code></small></h2>
          <p>
            <small>
            </small>
          </p>
        </div>

        <div v-if="messages.length" class="messages">
          <message v-for="message in messages" :message="message"/>
        </div>
        <div v-else>
          <center><i>Aucun message dans cette discussion.</i></center>
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
      if(this.$route.query.idmessage) {
        setTimeout(() => {
          this.scrollTo('#message-'+this.$route.query.idmessage);            
        },1000)
      }
      setInterval(this.chargerEtScroller,5000);
    });
  },
  methods : {
    chargerEtScroller() {
      this.chargerMessages(() => {
        this.scrollTo();            
      });

    },
    chargerMessages(callback=false) {
      window.axios.get('channels/'+this.discussion._id+'/posts').then((response) => {
        let count = this.messages.length ;
        this.messages = response.data;
        if(response.data.length != count)  {
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