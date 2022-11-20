<template >
  <section class="src-components-nav-bar">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link to="/">
              <a class="nav-link" href="#">Inicio</a>
            </router-link>
          </li>

          <li class="nav-item" v-if="usuarioLogeadoVuex">
            <router-link to="/formulario-receta">
              <a class="nav-link" href="#">Carga de recetas</a>
            </router-link>
          </li>
        </ul>
          <button class="btn btn-success my-2 my-sm-0 mr-3" @click="$router.push('/login')" v-if="!usuarioLogeadoVuex">
            Login
          </button>
          <button class="btn btn-success my-2 my-sm-0" @click="$router.push('/register')" v-if="!usuarioLogeadoVuex">
            Register
          </button>
          <button class="btn btn-danger my-2 my-sm-0" @click="cerrarSesion()" v-if="usuarioLogeadoVuex">
            Logout
          </button>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
  name: "src-components-nav-bar",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {
    cerrarSesion() {
      try {
        this.$store.dispatch("logoutUsuario");
      }
      catch (error) {
        console.log(error);
      }
    }
  },
  computed: {},
};
</script>

<style scoped lang="css">
</style>
