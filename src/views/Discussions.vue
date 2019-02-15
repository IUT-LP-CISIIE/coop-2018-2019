<template>
  <div class="discussions">
    <div class="hero">
      <div class="hero-body">

        <ul class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Coop</a>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/Discussions">Discussions</router-link>
          </li>
        </ul>        
        
        <h1>Discussions</h1>
        <p>
          <small>
            {{ discussions.length }} discussion(s)
            <router-link to="/CreerDiscussion">Créer une discussion</router-link>
          </small>
        </p>

      <div class="columns" v-for="discussions in discussionsCols">
        <div v-for="discussion in discussions" class="column" :class="'col-'+(12/colonnes)">
          <div  class="card">
            <div class="card-header">
              <div class="card-subtitle text-gray">{{ discussion.label }}</div>
              <div class="card-title h5">{{ discussion.topic }}</div>
            </div>
            <div class="card-body">
              
            </div>
            <div class="card-footer">
              <router-link :to="{name:'Discussion',params : { id : discussion._id }}" class="btn btn-primary">Ouvrir</router-link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Discussions',
  data() {
  	return {
      colonnes : 4,
      discussions : []
  	}
  },
  computed : {
    discussionsCols() {
      let ret = [];
      let tmp = [];
      this.discussions.forEach(discussion => {
        tmp.push(discussion);
        if(tmp.length==this.colonnes) {
          ret.push(tmp);
          tmp=[];
        }
      })
      if(tmp.length) {
        ret.push(tmp);
      }
      return ret;
    }
  },
  mounted() {
        window.axios.get('channels').then(response => {
          this.discussions = response.data
        })

  },
  methods : {

  }

};
</script>

<style scoped>
  .card{
    margin-bottom: 15px;    
    min-height: 250px;
  }
</style>
