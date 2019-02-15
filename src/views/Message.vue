<template>
	<div v-if="membre && message" class="tile">
		<div class="tile-icon">
			<figure class="avatar avatar-lg">
				<img :src="membre.avatar">
			</figure>
		</div>
		<div class="tile-content">
			<div class="tile-title">
				<router-link :to="{ name : 'Membre', params : {id : membre._id}}">{{ membre.fullname }}</router-link>
			</div>
			<p class="tile-subtitle">
				<template v-if="editer">

					<form @submit.prevent="editerMessage" class="input-group">
						<input ref="message" @keyup.esc="annulerEdition" class="form-input input-sm" type="text" v-model="nouveauMessage">
						<button class="btn btn-primary input-group-btn btn-sm">Valider</button>
					</form>

				</template>
				<template v-else>
					{{ message.message }}
					
				</template>
			</p>
		</div>
		<div class="tile-action">
			<button class="btn btn-sm" 
			@click="activerEdition" 
			v-if="actionOk" title="Editer">✏️</button>&nbsp;
			<button class="btn btn-sm" 
			@click="effacerMessage" 
			v-if="actionOk" title="Effacer">🗑️</button>
		</div>
	</div>





</template>
<script>
export default {
	name : 'Message',
	props : ['message'],
	data() {
		return {
			editer: false,
			membre : false,
			nouveauMessage : false
		}
	},
	mounted() {
		this.nouveauMessage = this.message.message;
		this.membre = this.getMembre(this.message.member_id);
		this.membre.avatar = this.avatarMembre(this.membre);
	},
	computed : {
		actionOk() {
			return !this.editer && this.message.member_id == this.$store.state.member.id
		}
	},
	methods : {
		activerEdition() {
			this.editer=true;
			setTimeout(() => {
				this.$refs["message"].focus();
			},10)
		},
		annulerEdition() {
			this.nouveauMessage = this.message.message;
			this.editer=false;
		},
		effacerMessage() {
			window.axios.delete('channels/'+this.message.channel_id+'/posts/'+this.message._id).then((response) => {
				this.message = false;
				this.$bus.$emit('chargerMessages');
			});
		},
		editerMessage() {
			window.axios.put('channels/'+this.message.channel_id+'/posts/'+this.message._id,{message : this.nouveauMessage}).then((response) => {
				this.editer=false;
			})	
		}
	}
};

</script>

<style>

</style>