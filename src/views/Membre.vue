<template>
  <div class="membre">
    <div class="hero" v-if="membre">
      <div class="hero-body">
       <ul class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="/">Coop</a>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/Membres">Membres</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{ name : 'Membre', params : {id : membre._id}}" class="member-name">{{ membre.fullname }}</router-link>
        </li>
      </ul>        

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
      <div class="messages" v-if="messages.length">
        <message v-for="message in messageSorted" :message="message" :discussion="message.discussion"/>
      </div>
      <i v-else>Ce membre n'a posté aucun message</i>

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
      discussions_ok : false,
      messages_ok : false,
    }
  },
  computed :{
    messageSorted() {
      if(this.discussions_ok && this.messages_ok) {
        let sorted = this.messages.sort((a,b) => {
          let date_a = new Date(a.created_at)
          let date_b = new Date(b.created_at)

          let ret = date_a > date_b ? -1 : (date_a < date_b ? 1 : 0);

          return ret;
        });
        return sorted;
      }
    }
  },
  mounted() {
    this.membre = this.getMembre(this.$route.params.id);

    window.axios.get('channels').then(response => {

      let discussions = response.data;

      discussions.forEach((discussion, discussions_index) => {

        window.axios.get('channels/'+discussion._id+'/posts').then((response) => {
          if(discussions_index+1 == discussions.length) {
            this.discussions_ok = true;
          }

          let messages = response.data;
          messages.forEach((message, messages_index) => {

            if(message.member_id == this.membre._id) {
              message['discussion'] = discussion;
              this.messages.push(message);            
            }

            if(this.discussions_ok && messages_index+1 == messages.length) {
              this.messages_ok = true;
            }
          }); 

        });

      });

    })

  }

};
</script>

<style scoped>

</style>
