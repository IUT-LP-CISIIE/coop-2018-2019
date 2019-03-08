<template>
	<div v-if="membre && message" :id="'message-'+message._id" class="tile message" :class="{'mine' : mine , 'focus' : focus}">
		<div class="tile-icon">
			<figure class="avatar avatar-lg">
				<img :src="membre.avatar">
			</figure>
		</div>
		<div class="tile-content">
			<div class="tile-title">
				<router-link :to="{ name : 'Membre', params : {id : membre._id}}" class="member-name">{{ membre.fullname }}</router-link>
				<small class="discussion" v-if="afficherDiscussion">
					posté le {{ dateFormat(message.created_at) }} dans 
					<router-link :to="{name:'Discussion', query : {idmessage : message._id}, params : { id : discussion._id }}">
					{{ discussion.label }}</b>
				</router-link> <code>{{ discussion.topic }}</code>
			</small>
		</div>
		<p class="tile-subtitle">
			<template v-if="editer">

				<form @submit.prevent="editerMessage" class="input-group">
					<input ref="message" @keyup.esc="annulerEdition" class="form-input input-sm" type="text" v-model="nouveauMessage">
					<button type="button" @click="annulerEdition" class="btn btn-text input-group-btn btn-sm">Annuler</button>
					<button class="btn btn-primary input-group-btn btn-sm">Valider</button>
				</form>

			</template>
			<template v-else>
				{{ message.message }}

			</template>
		</p>
	</div>
	<div class="tile-action">
		<button class="btn btn-sm btn-link" 
		@click="activerEdition" 
		v-if="actionOk" title="Editer">✏️</button>&nbsp;
		<button class="btn btn-sm btn-link" 
		@click="effacerMessage" 
		v-if="actionOk" title="Effacer">🗑️</button>
	</div>
</div>





</template>
<script>
export default {
	name : 'Message',
	props : {
		message : Object,
		discussion: {
			default: false,
		}
	},
	data() {
		return {
			afficherDiscussion:false,
			editer: false,
			membre : false,
			nouveauMessage : false
		}
	},
	mounted() {
		if(this.discussion) {
			this.afficherDiscussion=true
		}
		this.nouveauMessage = this.message.message;
		this.membre = this.getMembre(this.message.member_id);
		this.membre.avatar = this.avatarMembre(this.membre);
	},
	computed : {
		actionOk() {
			return !this.editer && this.message.member_id == this.$store.state.member.id
		},
		focus() {
			return this.$route.query.idmessage == this.message._id;
		},
		mine() {
			return !this.afficherDiscussion && this.actionOk
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
			if(confirm('Effacer ce message ?')) {
				window.axios.delete('channels/'+this.message.channel_id+'/posts/'+this.message._id).then((response) => {
					this.message = false;
					this.$bus.$emit('chargerMessages');
				});
			}
		},
		editerMessage() {
			window.axios.put('channels/'+this.message.channel_id+'/posts/'+this.message._id,{message : this.nouveauMessage}).then((response) => {
				this.editer=false;
			    this.$bus.$emit('chargerMessages');
			})	
		}
	}
};

</script>

<style>
.message {
	padding : 5px;
}
.mine .member-name{
	font-weight: bolder;
}
.focus {
	background: rgba(255,0,0,0.1);
}

.discussion_,.tile-action {
  visibility: hidden;
}
.message:hover .discussion,
.message:hover .tile-action {
  visibility: visible;
}

</style>