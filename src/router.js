import Vue from "vue";
import VueRouter from "vue-router";

import FormularioReceta from "./components/FormularioReceta.vue";
import BuscadorReceta from "./components/BuscadorReceta.vue";
import Receta from "./components/Receta.vue";
import LoginUsuario from "./components/LoginUsuario.vue";
import ModificarReceta from "./components/ModificarReceta.vue";
import SubscribirNewsletter from "./components/SubscribirNewsletter.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: BuscadorReceta },
    { path: "/formulario-receta", component: FormularioReceta },
    { path: "/receta", component: Receta },
    { path: "/login", component: LoginUsuario },
    { path: "/modificar", component: ModificarReceta },
    { path: "/newsletter", component: SubscribirNewsletter },
  ],
});
