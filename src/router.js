import Vue from 'vue'
import VueRouter from 'vue-router'


import FormularioReceta from './components/FormularioReceta.vue'
import BuscadorReceta from './components/BuscadorReceta.vue'
import Receta from './components/Receta.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: BuscadorReceta },
        { path: '/formulario-receta', component: FormularioReceta },
        { path: '/receta', component: Receta}
    ]
})
 
