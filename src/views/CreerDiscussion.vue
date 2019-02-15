<template>
  <div class="creer-discussion">
    <h3>Nouvelle discussion</h3>
      <form @submit.prevent="creerDiscussion">
      
        <div>
          <b>Sujet</b><br>
          <input v-model="discussion.topic" required>     
        </div>

        <div>
          <b>Etiquette</b><br>
          <input v-model="discussion.label" required>     
        </div>

    <div>
      <button>Valider</button>     
      <router-link to="/">Annuler</router-link>     
    </div>
      
      </form>


  </div>
</template>

<script>
export default {
  name: 'CreerDiscussion',
  data() {
  	return {
      discussion : {
        topic : '',
        label : ''
      }
  	}
  },
  mounted() {
  },
  methods : {
    creerDiscussion() {
        window.axios.post('channels',this.discussion).then(response => {

          this.$router.push('/Discussions');
          
        }).catch(error => {

          alert(error.response.data.error);

        });      
    }
  }

};
</script>
