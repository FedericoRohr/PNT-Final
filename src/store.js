import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        receta: {}
    },
    actions: {
        modificarReceta({commit}, receta) {
            try {
                commit('modificarReceta', receta)
            }
            catch (error) {
                console.log(error);
            }
        } 
    },
    mutations: {
        modificarReceta(state, receta) {
            state.receta = receta
        }
    }
})