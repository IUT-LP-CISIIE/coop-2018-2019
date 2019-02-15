import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state : {
        token : false,
        members : [],
        member : false
    },
    mutations : {
        setToken(state,token) {
            state.token = token;
        },
        setMember(state,member) {
            state.member = member;
        },
        setMembers(state,members) {
            state.members = members;
        },
        initialiseStore(state) {
            if(localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store')))
                );
            }
        }
    }
})