<template>
  <div class="membre">
    <div class="hero" v-if="membre">
      <div class="hero-body">
        <h1>
          <figure class="avatar avatar-xl">
            <img :src="avatarMembre(membre)">
          </figure>
        {{membre.fullname}}</h1>
        <p>
          <small>
            {{ membre.email }}
          </small>
        </p>

        <h2>Messages posté par cet auteur</h2>
        <div class="messages">
          <message v-for="message in messageSorted" :message="message" :discussion="message.discussion"/>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
import Message from '@/views/Message.vue';
export default {
  components : {Message},
  name: 'Membre',
  data() {
  	return {
      membre : false,
      messages : [],
    }
  },
  computed :{
    messageSorted() {
      let sorted = this.messages.sort((a,b) => {
        let date_a = new Date(a.created_at)
        let date_b = new Date(b.created_at)
        return date_a > date_b ? -1 : (date_a < date_b ? 1 : 0);
      });
      return sorted;
    }
  },
  mounted() {
    this.membre = this.getMembre(this.$route.params.id);

    window.axios.get('channels').then(response => {


      response.data.forEach(discussion => {

        window.axios.get('channels/'+discussion._id+'/posts').then((response) => {

          response.data.forEach(message => {
            if(message.member_id == this.membre._id) {
              message['discussion'] = discussion;
              this.messages.push(message);
            }
          })    
        });
      });
    })

  }

};
</script>

<style scoped>

</style>
