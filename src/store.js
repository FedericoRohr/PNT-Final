import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        receta: {},
        usuario: null
    },
    actions: {
        modificarReceta({commit}, receta) {
            try {
                commit('modificarReceta', receta)
            }
            catch (error) {
                console.log(error);
            }
        },
        loginUsuario({commit}, usuario) {
            try {
                commit('loginUsuario', usuario)
            }
            catch(error) {
                console.log(error);
            }
        },
        logoutUsuario({commit}) {
            try {
                commit('logoutUsuario')
            }
            catch(error) {
                console.log(error);
            }
        }  
    },
    mutations: {
        modificarReceta(state, receta) {
            state.receta = receta
        },
        loginUsuario(state, usuario) {
            state.usuario = usuario
        },
        logoutUsuario(state) {
            state.usuario = null
        }
    }
})