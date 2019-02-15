<template>
  <div class="creer-compte">
  	
  	<div>
  		<h1>Créer un compte</h1>

      <form @submit.prevent="creationCompte">
     	
      	<div>
          <b>Nom</b><br>
     			<input v-model="fullname" required>
     		</div>

        <div>
          <b>Email</b><br>
          <input v-model="email" type="email" required>     
        </div>

        <div>
          <b>Mot de passe</b><br>
          <input v-model="password" type="password" required>     
        </div>

        <div>
          <b>Vérification</b><br>
          <input v-model="passwordVerif" type="password" required>     
        </div>

     		<div>
    	 		<button>Valider</button> 		
    	 	</div>
      
      </form>
   	
    </div>
    

    <router-link to="/">Retour</router-link>

  </div>
</template>

<script>
export default {
  name: 'CreerCompte',
  data() {
    return {
      fullname: '', 
      email: '', 
      password: '',
      passwordVerif: '',
    }
  },
  methods : {
    creationCompte() {
      if(this.password == this.passwordVerif) {

        window.axios.post('members',{
          fullname : this.fullname,
          email : this.email,
          password : this.password
        }).then(response => {

          alert('Votre compte a été créé. Vous pouvez vous connecter');

          this.$router.push('/');
          
        }).catch(error => {

          alert(error.response.data.error.join("\n"));

        });

      } else {

        alert("Les deux mots de passe ne correspondent pas");
      
      }
    }
  }
};
</script>
