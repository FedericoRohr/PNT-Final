<template>
  <div class="jumbotron">
    <div class="card">
      <div class="card-body">
        <table>
          <tr>
            <td>
              <h1 class="card-title">
                {{ mostrarTituloVuex }}
              </h1>
            </td>
            <td>
              <ul>
                <li>
                  <b>Categoría: </b>
                  {{ mostrarCategoriaVuex }}
                </li>
                <li>
                  <b>Momento: </b>
                  {{ mostrarMomentoVuex }}
                </li>
                <li>
                  <b>Likes: </b>
                  {{ mostrarLikesVuex }}
                </li>
              </ul>
            </td>
          </tr>
        </table>

        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">Ingredientes</th>
              <th scope="col">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(ingrediente, index) in mostrarIngredientesVuex"
              :key="index"
            >
              <td>{{ ingrediente.nombre }}</td>
              <td>{{ ingrediente.cantidad }}</td>
            </tr>
          </tbody>
        </table>
        <p class="card-text">
          {{ mostrarDescripcionVuex }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "src-components-receta",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped lang="css">
.jumbotron {
  background-color: teal;
}
</style>
