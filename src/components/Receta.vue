<template>
  <div class="jumbotron">
    <div class="card">
      <div class="card-body">
        <table>
          <tr>
            <td>
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
            </td>
            <td style="float: right" v-if="usuarioLogeadoVuex">
              <ul style="list-style-type: none">
                <li>
                  <button
                    type="button"
                    class="btn btn-primary mb-3"
                    @click="$router.push('/modificar')"
                  >
                    Modificar
                  </button>
                </li>
                <li>
                  <!-- Button trigger modal -->
                  <button
                    type="button"
                    class="btn btn-warning"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    Eliminar
                  </button>

                  <!-- Modal -->
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-body">
                          Segurx que deseas eliminar la receta?
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            @click="eliminarReceta()"
                            data-dismiss="modal"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
    return {
      url: "http://localhost:8080/recetas/",
    };
  },
  methods: {
    async eliminarReceta() {
      try {
        console.log(this.mostrarIdVuex);
        await this.axios.delete(
          `${this.url}${this.mostrarIdVuex}`,
          this.datos,
          {
            "content-type": "application/json",
          }
        );
        this.$store.dispatch("modificarReceta", {});
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
.jumbotron {
  background-color: teal;
}
</style>
