<template>
  <section class="src-components-ingreso-gastos">
    <div class="jumbotron">
      <h2>Ingresa una receta</h2>

      <table>
        <tr>
          <td class="receta">
            <!--    FORMULARIO RECETA     -->
            <vue-form :state="formStateReceta" @submit.prevent="enviarReceta()">
              <!-- ----------------------------------- -->
              <!--            CAMPO TITULO             -->
              <!-- ----------------------------------- -->
              <validate tag="div">
                <label for="titulo">Titulo</label>
                <input
                  type="text"
                  id="titulo"
                  class="form-control"
                  autocomplete="off"
                  v-model="formDataReceta.titulo"
                  name="titulo"
                  required
                  :minlength="tituloMinLength"
                />
                <field-messages name="titulo" show="$dirty">
                  <div slot="required" class="alert alert-danger mt-1">
                    Campo requerido
                  </div>
                  <div slot="minlength" class="alert alert-danger mt-1">
                    Este campo debe poseer al menos
                    {{ tituloMinLength }} caracteres
                  </div>
                </field-messages>
              </validate>

              <br />

              <!-- ----------------------------------- -->
              <!--         CAMPO DESCRIPCIÓN           -->
              <!-- ----------------------------------- -->
              <validate tag="div">
                <label for="descripcion">Descripción</label>
                <textarea
                  type="text"
                  id="descripcion"
                  class="form-control"
                  autocomplete="off"
                  v-model.trim="formDataReceta.descripcion"
                  name="descripcion"
                  required
                  rows="15"
                >
                </textarea>
                <field-messages name="descripcion" show="$dirty">
                  <div slot="required" class="alert alert-danger mt-1">
                    Campo requerido
                  </div>
                </field-messages>
              </validate>

              <br />

              <!-- ----------------------------------- -->
              <!--          CAMPO CATEGORÍA            -->
              <!-- ----------------------------------- -->
              <div class="form-row">
                <div class="form-group col-md-6">
                  <validate tag="div">
                    <label for="categoria">Categoría</label>
                    <select
                      name="categoria"
                      id="categoria"
                      class="form-control"
                      v-model="formDataReceta.categoria"
                      required
                    >
                      <option
                        v-for="(categoria, index) in options.categorias"
                        :key="index"
                      >
                        {{ categoria }}
                      </option>
                    </select>
                    <field-messages name="categoria" show="$dirty">
                      <div slot="required" class="alert alert-danger mt-1">
                        Campo requerido
                      </div>
                    </field-messages>
                  </validate>
                </div>
                <div class="form-group col-md-6">
                  <validate tag="div">
                    <label for="momento">Momento</label>
                    <select
                      name="cateogria"
                      id="momento"
                      class="form-control"
                      v-model="formDataReceta.momento"
                      required
                    >
                      <option
                        v-for="(momento, index) in options.momentos"
                        :key="index"
                      >
                        {{ momento }}
                      </option>
                    </select>
                    <field-messages name="momento" show="$dirty">
                      <div slot="required" class="alert alert-danger mt-1">
                        Campo requerido
                      </div>
                    </field-messages>
                  </validate>
                </div>
              </div>
              <button
                class="btn btn-success my-3"
                :disabled="formStateReceta.$invalid || ingredientes.length == 0"
              >
                Enviar receta
              </button>
            </vue-form>
          </td>
          <td class="receta">
            <!--    FORMULARIO INGREDIENTES     -->
            <vue-form
              :state="formStateIngrediente"
              @submit.prevent="enviarIngrediente()"
            >
              <!-- ----------------------------------- -->
              <!--         CAMPO INGREDIENTE           -->
              <!-- ----------------------------------- -->
              <validate tag="div">
                <label for="ingrediente">Ingrediente</label>
                <input
                  type="text"
                  id="ingrediente"
                  class="form-control"
                  autocomplete="off"
                  v-model="formDataIngrediente.nombre"
                  name="ingrediente"
                  required
                />
                <field-messages name="ingrediente" show="$dirty">
                  <div slot="required" class="alert alert-danger mt-1">
                    Campo requerido
                  </div>
                </field-messages>
              </validate>

              <br />

              <!-- ----------------------------------- -->
              <!--           CAMPO CANTIDAD            -->
              <!-- ----------------------------------- -->
              <validate tag="div">
                <label for="cantidad">Cantidad</label>
                <input
                  type="text"
                  id="cantidad"
                  class="form-control"
                  autocomplete="off"
                  v-model.trim="formDataIngrediente.cantidad"
                  name="cantidad"
                  required
                />
                <field-messages name="cantidad" show="$dirty">
                  <div slot="required" class="alert alert-danger mt-1">
                    Campo requerido
                  </div>
                </field-messages>
              </validate>

              <button
                class="btn btn-success my-3"
                :disabled="formStateIngrediente.$invalid"
              >
                Agregar
              </button>
            </vue-form>
          </td>
        </tr>
      </table>
    </div>

    <br />

    <div class="jumbotron" v-if="mostrarReceta()">
      <div
        class="jumbotron"
        style="background-color: rgb(235, 255, 251); color: black"
      >
        <h1>{{ formDataReceta.titulo }}</h1>
        <hr />
        <h5>{{ `Categoría: ${formDataReceta.categoria}` }}</h5>
        <h5>{{ `Momento: ${formDataReceta.momento}` }}</h5>
        <div class="table-responsive">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th>Ingrediente</th>
                <th>Cantidad</th>
                <th></th>
              </tr>
            </thead>
            <tr v-for="(ing, index) in ingredientes" :key="index">
              <td>{{ ing.nombre }}</td>
              <td>{{ ing.cantidad }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="ingredientes.splice(index, 1)"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </table>
        </div>
        <hr />
        <p style="white-space: pre-line">{{ formDataReceta.descripcion }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "src-components-formulario-receta",
  props: [],
  async beforeMount() {
    await this.getOptions();
  },
  data() {
    return {
      formDataReceta: this.getInitialDataReceta(),
      formDataIngrediente: this.getInitialDataIngrediente(),
      formStateReceta: {},
      formStateIngrediente: {},
      datos: null,
      ingredientes: [],
      tituloMinLength: 3,
      limiteVerde: 1000,
      limiteNaranja: 5000,
      presupuesto: "",
      url: "http://localhost:8080/recetas/",
      options: [],
    };
  },
  methods: {
    getInitialDataReceta() {
      return {
        titulo: "",
        descripcion: "",
        categoria: "",
        momento: "",
      };
    },
    getInitialDataIngrediente() {
      return {
        nombre: "",
        cantidad: "",
      };
    },
    async enviarReceta() {
      let titulo = this.formDataReceta.titulo
      titulo = titulo.charAt(0).toUpperCase() + titulo.slice(1).toLowerCase()
      this.formDataReceta.titulo = titulo
      this.datos = this.formDataReceta;
      this.datos.ingredientes = this.ingredientes;
      this.formDataReceta = this.getInitialDataReceta();
      this.ingredientes = [];
      this.formStateReceta._reset();
      try {
        let {data} = await this.axios.post(this.url, this.datos, {
          "content-type": "application/json",
        });
        let insertedId = data._id
        this.datos.likes = 0
        console.log(insertedId);
        this.datos._id = insertedId
        console.log(JSON.stringify(this.datos, null, 4));
        this.$store.dispatch("modificarReceta", this.datos);
        this.$router.push("/receta");
      } catch (error) {
        console.log(error);
      }
    },
    enviarIngrediente() {
      let nombre = this.formDataIngrediente.nombre
      nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase()
      this.formDataIngrediente.nombre = nombre
      this.ingredientes.push(this.formDataIngrediente);
      this.formDataIngrediente = this.getInitialDataIngrediente();
      this.formStateIngrediente._reset();
    },
    mostrarReceta() {
      return (
        this.formDataReceta.titulo != "" ||
        this.formDataReceta.descripcion != "" ||
        this.ingredientes.length > 0
      );
    },
    async getOptions() {
      try {
        let res = await this.axios(this.url);
        let recetas = res.data;
        let categorias = recetas.map((receta) => receta.categoria);
        categorias = [...new Set(categorias)];
        let momentos = recetas.map((receta) => receta.momento);
        momentos = [...new Set(momentos)];
        this.options = { categorias, momentos };
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
  color: white;
}

hr {
  background-color: #bbb;
}

td.receta {
  padding: 50px;
}

table {
  margin-left: auto;
  margin-right: auto;
  width: -moz-available;
}
</style>
