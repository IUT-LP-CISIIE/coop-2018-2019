<template>
  <div v-if="applicationEstActive" class="container">

    <header class="navbar" v-if="memberConnected()">
      <section class="navbar-section">
        <div class="navbar-brand mr-2">Coop</div>
          <router-link class="btn btn-link" to="/Discussions">Discussions</router-link>
          <router-link class="btn btn-link" to="/Membres">Membres</router-link>
      </section>
      <section class="navbar-section">
          Connecté en tant que {{ nomMembre() }}
          <a class="btn btn-link" @click="seDeconnecter">Se déconnecter</a>
      </section>
    </header>



    <div class="content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      applicationEstActive : false
    }
  },
  mounted() {
    this.testToken(() => {      
      // http://coop.api.netlor.fr/api/ping
      window.axios.get('ping').then((response) => {

        this.applicationEstActive = true

        this.chargerMembres()


      }).catch((error) => {

        this.applicationEstActive = false
        alert("L'application n'est pas disponible");

      });
    });

  }
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}

.router-link-active {
  color:#888;  
  text-decoration: underline;
}

</style>
