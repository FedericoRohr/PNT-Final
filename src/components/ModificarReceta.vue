<template>
  <section class="src-components-ingreso-gastos">
    <div class="jumbotron">
      <div class="cajaForm col-12">
      <h2>Modifique la receta</h2>

      <table class="container-fluid">
        <tr class="col-12">
          <td class="receta col-6">
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
                Modificar receta
              </button>
            </vue-form>
          </td>
          <td class="receta col-6">
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
    </div>

    <br />

    <div class="jumbotron" v-if="mostrarReceta()">
      <div
        class="jumbotron2"
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
      ingredientes: this.$store.state.receta.ingredientes,
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
        titulo: this.$store.state.receta.titulo,
        descripcion: this.$store.state.receta.descripcion,
        categoria: this.$store.state.receta.categoria,
        momento: this.$store.state.receta.momento,
        likes: this.$store.state.receta.likes,
      };
    },
    getInitialDataIngrediente() {
      return {
        nombre: "",
        cantidad: "",
      };
    },
    async enviarReceta() {
      this.datos = this.formDataReceta;
      this.datos.ingredientes = this.ingredientes;
      console.log(JSON.stringify(this.datos, null, 4));
      this.formDataReceta = this.getInitialDataReceta();
      this.ingredientes = [];
      this.formStateReceta._reset();
      try {
        await this.axios.put(
          `${this.url}${this.mostrarIdVuex}`,
          this.datos,
          {
            "content-type": "application/json",
          }
        );
        this.$store.dispatch("modificarReceta", this.datos);
        this.$router.push("/receta");
      } catch (error) {
        console.log(error);
      }
    },
    enviarIngrediente() {
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
  background-image: url("../images/receta-de-tarta-banoffee-800x533.jpg");
  color: white;
  background-size: cover;
}

.cajaForm{
  background-color: #2f2f2fac!important;
  border-radius: 5px;
  padding: 20px 20px;
  margin-top: 50px;
}

.jumbotron2{
  padding: 30px 10px;
  background-color: #2f2f2fb3!important;
  color: white!important;
  background-size: cover;
}

table{
  color: white;
}

button{
  text-decoration: none!important;
  color: rgba(255, 255, 255, 0.738)!important;
}

button{
  background-color: #2f2f2f!important;
  border-color: #2f2f2f!important;
}
button:hover{
  background-color: #D9553B!important;
  transition: 0.5s;
  border-color: #2f2f2f;
}


td.receta {
  padding: 50px;
}



hr {
  background-color: #bbb;
}



.muestraReceta{
  margin-top: 50px;
}

table {
  margin-left: auto;
  margin-right: auto;
  width: -moz-available;
}
</style>
