<template>
  <div class="membres">
    <div class="hero">
      <div class="hero-body">
        <h1>Membres</h1>
        <p>
          <small>
            {{ $store.state.members.length }} membre(s)
          </small>
        </p>

<table class="table">
  <thead>
    <tr>
      <th>Nom</th>
      <th>Email</th>
      <th>&nbsp;</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="membre in $store.state.members">
      <td><router-link :to="{ name : 'Membre', params : {id : membre._id}}">{{ membre.fullname }}</router-link></td>
      <td>{{ membre.email }} </td>
      <td><button v-show="$store.state.member.id != membre._id" @click="effacerMembre(membre._id)">🗑️</button></td>
    </tr>
  </tbody>
</table>


      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'Membres',
  data() {
  	return {
  	}
  },
  mounted() {
  },
  methods : {
    effacerMembre(id) {
      window.axios.delete('members/'+id).then(response => {
        this.chargerMembres()
      });
    }
  }

};
</script>

<style scoped>

</style>
