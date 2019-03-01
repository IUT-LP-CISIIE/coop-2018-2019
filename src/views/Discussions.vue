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

            <template v-if="editer == discussion._id">
              <div  class="card">
                <div class="card-header">
                  <form @submit.prevent="editerDiscussion()" class="">
                    <div class="form-group">
                      <input @keyup.esc="annulerEdition" class="form-input input-sm" type="text" v-model="discussionEdit.topic">
                    </div>
                    <div class="form-group">
                      <input ref="label" @keyup.esc="annulerEdition" class="form-input input-sm" type="text" v-model="discussionEdit.label">
                    </div>
                    <button class="btn btn-primary input-group-btn btn-sm">Valider</button>
                    <a @click="annulerEdition" class="btn btn-link input-group-btn btn-sm">Annuler</a>
                  </form>
                </div>
              </div>
            </template>
            <template v-else>
              <div  class="card">

                <div class="card-header">
                  <div class="card-subtitle text-gray"><code>{{ discussion.topic }}</code></div>
                  <div class="card-title h5">{{ discussion.label }}</div>
                </div>
                <div class="card-body">

                </div>
                <div class="card-footer">
                  <router-link :to="{name:'Discussion',params : { id : discussion._id }}" class="btn btn-primary">Ouvrir</router-link>


                  <button class="btn btn-link" 
                  @click="activerEdition(discussion)" 
                  title="Editer">✏️</button>&nbsp;

                  <button class="btn btn-link" 
                  @click="effacerDiscussion(discussion)" 
                  title="Effacer">🗑️</button>

                </div>
              </div>
            </template>

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
      discussions : [],
      discussionOriginale : false,
      discussionEdit : {
      },
      editer:false
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
    this.chargerDiscussions();
  },
  methods : {
    annulerEdition(discussion) {
      this.editer=false;
    },
    activerEdition(discussion) {

      this.editer = discussion._id;
      this.discussionEdit.label = discussion.label;
      this.discussionEdit.topic = discussion.topic;
      setTimeout(() => {
//        this.$refs.label.focus();
      },1000)
    },
    chargerDiscussions() {
      window.axios.get('channels').then(response => {
        this.discussions = response.data
      })
    },
    effacerDiscussion(discussion) {
      if(confirm('Voulez vous effacer cette discussion ?')) {
        window.axios.delete('channels/'+discussion._id).then((response) => {
          this.chargerDiscussions();
        });
      }
    },
    editerDiscussion() {
      window.axios.put('channels/'+this.editer,{
        label : this.discussionEdit.label, 
        topic : this.discussionEdit.topic 
      }).then((response) => {
        this.chargerDiscussions();
        this.editer=false;
      }) ;
    }
  }

};
</script>

<style scoped>
.card{
  margin-bottom: 15px;    
  min-height: 250px;
}
</style>
