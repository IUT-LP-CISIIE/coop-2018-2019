import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import axios from 'axios'

/* Import de la librairie d'utilitaires 
	Ensemble de fonctions accessible depuis n'importe quel composant
*/
import {Utils} from './mixins/utils.js'
Vue.mixin(Utils)



/* 	Enregistrement du store dans le localStorage 
	lors de chaque mutation du state
*/
store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state));
});

Vue.prototype.$bus = new Vue();


Vue.config.productionTip = false

window.axios = axios.create({ 
	baseURL: 'http://coop.api.netlor.fr/api', 
	params : { 
		token : false
	}, 
	headers: { 
		Authorization: 'Token token=96bf1fe6838a4f7cbd8c2fce26a63627' 
	} 
});

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit('initialiseStore');
  },
  render: h => h(App)
}).$mount('#app')
