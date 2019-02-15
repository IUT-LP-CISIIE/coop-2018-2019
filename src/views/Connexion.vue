<template>
  <div class="connexion">

	  <h1>Se connecter</h1>  	
      <form @submit.prevent="seConnecter">
     	
        <div>
          <b>Email</b><br>
          <input v-model="email" type="email" required>     
        </div>

        <div>
          <b>Mot de passe</b><br>
          <input v-model="password" type="password" required>     
        </div>

 		<div>
	 		<button>Se connecter</button> 		
	 	</div>
      
      </form>
    

    <router-link to="/CreerCompte">Créer un compte</router-link>

  </div>
</template>

<script>
export default {
  name: 'Connexion',
  data() {
  	return {
  		email : 'gilles.francois@yahoo.fr',
  		password : 'gilles'
  	}
  },
  mounted() {
  	if(this.memberConnected()) {
		this.$router.push('/Discussions');
  	}
  },
  methods : {
  	seConnecter() {

        window.axios.post('members/signin',{
          email : this.email,
          password : this.password
        }).then(response => {

	        this.$store.commit('setMember', {
	        	fullname : response.data.fullname,
	        	email : response.data.email,
	        	id : response.data._id,
	        });

	        this.$store.commit('setToken', response.data.token);
	        
        	this.setTokenAxios(response.data.token);

			this.$router.push('/Discussions');
          
        }).catch(error => {

          alert(error.response.data.error);

        });


  	}
  }

};
</script>
