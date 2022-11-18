import Vue from 'vue'
import VueRouter from 'vue-router'


import Formulario from './components/Formulario.vue'
import Inicio from './components/Inicio.vue'
import FormularioIngreso from './components/FormularioIngreso.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Inicio },
        { path: '/formulario', component: Formulario },
        { path: '/formularioIngreso', component: FormularioIngreso },
    ]
})
 
