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

      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'Membre',
  data() {
  	return {
      membre : false
  	}
  },
  mounted() {
      this.membre = this.getMembre(this.$route.params.id)
  }

};
</script>

<style scoped>

</style>
