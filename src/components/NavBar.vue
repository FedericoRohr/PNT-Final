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

          <li class="nav-item">
            <router-link to="/formulario-receta">
              <a class="nav-link" href="#">Carga de recetas</a>
            </router-link>
          </li>
        </ul>
          <button class="btn btn-success my-2 my-sm-0 mr-3" @click="$router.push('/login')">
            Login
          </button>
          <button class="btn btn-success my-2 my-sm-0" @click="$router.push('/register')">
            Register
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
  },
  computed: {},
};
</script>

<style scoped lang="css">
</style>
