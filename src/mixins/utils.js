export const Utils = {
	methods : {
		dateFormat(date) {
			let d = new Date(date);
			let jour = this.pad(d.getDate());
			let mois = this.pad(d.getMonth()+1);
			let annee = d.getFullYear();

			return jour+'/'+mois+'/'+annee;
		},
		pad(valeur) {
			if(valeur<10) {
				valeur='0'+valeur;
			}
			return valeur;
		},
		scrollTo(target=false) {
			let top;
			if(target) {
				console.log(target, document.querySelector(target))
				top = document.querySelector(target).offsetTop;
			} else {
				top = document.body.offsetHeight;
			}
			setTimeout(() => {
				window.scroll({
					top: top, 
					left: 0, 
					behavior: 'smooth'
				});
			},10)
		},		
		avatarMembre(membre) {
			let md5 = require('md5');
			let hash = md5(membre.email);
			let defaut = 'https://api.adorable.io/avatars/400/'+hash+'.png'
			let gravatar = 'https://secure.gravatar.com/avatar/'+hash+'?s=400&d='+encodeURIComponent(defaut);
			return gravatar;
		},
		chargerMembres() {
			window.axios.get('members').then(response => {
				this.$store.commit('setMembers', response.data);
			});
		},
		getMembre(id) {
			let membre = false;
			this.$store.state.members.forEach(member => {
				if(member._id == id) {
					membre = member;
					return;
				}
			});
			return membre;
		},
		nomMembre() {
			return this.$store.state.member.fullname;
		},
		seDeconnecter() {
			window.axios.delete('members/signout').finally(response => {
				this.setTokenAxios(false);		
				this.$store.commit('setToken', false);
				this.$store.commit('setMember', false);
				this.$router.push('/');
			})
		},
		testToken(callback) {
			if(!this.memberConnected()) {
				this.$router.push('/');
				callback();
			} else {
				window.axios.get('members/'+this.$store.state.member.id+'/signedin').then(response => {
					callback();				
				}).catch(() => {
					this.seDeconnecter();
					callback();
				})
			}
		},
		memberConnected() {
			if(this.$store.state.member === false) {
				return false;
			} else {
				this.setTokenAxios(this.$store.state.token);		
				return true;
			}
		},
		setTokenAxios(token) {
			window.axios.defaults.params.token = token;
		}
	}
}