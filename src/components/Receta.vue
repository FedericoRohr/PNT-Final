<template>
  <div class="jumbotron">
    <div class="card mt-5 cajaForm">
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
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
            <td style="float: right">
              <ul style="list-style-type: none">
                <li v-if="!usuarioLogeadoVuex">
                  <button
                    type="button"
                    class="btn btn-primary mb-3"
                    data-toggle="modal"
                    data-target="#modalMail"
                  >
                    Enviar al mail
                  </button>
                  <div
                    class="modal fade"
                    id="modalMail"
                    tabindex="-1"
                    aria-labelledby="modalMailLabel"
                    aria-hidden="true"
                    role="dialog"
                  >
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-body">
                          <label for="email"
                            >Ingrese un mail para enviar la receta</label
                          >
                          <input
                            type="email"
                            id="email"
                            class="form-control"
                            autocomplete="off"
                            v-model.trim="email"
                            name="email"
                            required
                            placeholder="Ingresa tu email..."
                          />
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Cerrar
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            @click="enviarReceta()"
                            data-dismiss="modal"
                          >
                            Enviar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li v-if="usuarioLogeadoVuex">
                  <button
                    type="button"
                    class="btn btn-primary mb-3"
                    @click="$router.push('/modificar')"
                  >
                    Modificar
                  </button>
                </li>
                <li v-if="usuarioLogeadoVuex">
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
                            Cerrar
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
              <td>{{ ingrediente.nombre | formatoIngrediente }}</td>
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
      email: "",
    };
  },
  methods: {
    async eliminarReceta() {
      try {
        await this.axios.delete(`${this.url}${this.mostrarIdVuex}`, {
          "content-type": "application/json",
        });
        this.$store.dispatch("modificarReceta", {});
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async enviarReceta() {
      let receta = {
        titulo: this.mostrarTituloVuex,
        ingredientes: this.mostrarIngredientesVuex,
        descripcion: this.mostrarDescripcionVuex,
      };
      await this.axios.post(`${this.url}enviarReceta/${this.email}`, receta, {
        "content-type": "application/json",
      });
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
.jumbotron {
  background-image: url("../images/receta-de-torta-oreo-800x534.jpg");
  color: white;
  background-size: cover;
}
.cajaForm {
  background-color: #2f2f2fac !important;
  border-radius: 5px;
  padding: 20px 20px;
  margin-top: 20px;
  color: white;
}
.table {
  color: white;
}

button {
  text-decoration: none !important;
  color: rgba(255, 255, 255, 0.738) !important;
}

button {
  background-color: #2f2f2f !important;
  border-color: #2f2f2f !important;
}
button:hover {
  background-color: #d9553b !important;
  transition: 0.5s;
  border-color: #2f2f2f;
}

.modal-body {
  color: black;
}
</style>
