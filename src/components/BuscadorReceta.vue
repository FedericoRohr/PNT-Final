<template>
  <section class="src-components-buscador-receta">
    <div class="jumbotron">
      <h2>Busca una receta</h2>
      <br />
      <ul class="list-group">
        <li class="list-group-item">
          <table style="color: black">
            <tr>
              <td style="padding: 0px 20px 0px 0px">
                <label for="titulo">Nombre receta</label>
                <input
                  type="text"
                  class="form-control"
                  id="titulo"
                  name="titulo"
                  v-model.trim="tituloReceta"
                  placeholder="Ingresar un nombre de receta..."
                />
              </td>
              <td style="padding: 0px 20px 0px 0px">
                <label for="categoria">Categoría</label>
                <select
                  name="categoria"
                  id="categoria"
                  class="form-control"
                  v-model.trim="categoria"
                >
                  <option value="">No seleccionar</option>
                  <option
                    v-for="(categoria, index) in options.categorias"
                    :key="index"
                  >
                    {{ categoria }}
                  </option>
                </select>
              </td>
              <td>
                <label for="momento">Momento</label>
                <select
                  name="cateogria"
                  id="momento"
                  class="form-control"
                  v-model.trim="momento"
                  required
                >
                  <option value="">No seleccionar</option>
                  <option
                    v-for="(momento, index) in options.momentos"
                    :key="index"
                  >
                    {{ momento }}
                  </option>
                </select>
              </td>
            </tr>
          </table>
        </li>
        <li class="list-group-item">
          <MultiSelect
            style="width: -moz-available"
            id="ingredientes"
            name="ingredientes"
            v-model="ingredientesSeleccionados"
            :options="ingredientesTotal"
            optionLabel="nombre"
            placeholder="Seleccione ingredientes"
            :filter="true"
            display="chip"
            :showToggleAll="false"
          />
        </li>
      </ul>
    </div>
    <!-- ------------------------------------------------------- -->
    <!--                       CARDS                             -->
    <!-- ------------------------------------------------------- -->

    <div v-if="mostrarCard">
      <div
        class="jumbotron"
        style="color: black"
        v-if="recetasFiltradas.length > 0"
      >
        <div class="card-columns">
          <div
            class="col mb-4"
            v-for="(receta, index) in recetasFiltradas"
            :key="index"
          >
            <CardReceta :receta="receta" :id-data-toggle="index"/>
          </div>
        </div>
      </div>
      <div class="alert alert-danger" role="alert" v-else>
        No hay resultados para tu búsqueda
      </div>
    </div>
  </section>
</template>

<script>
import CardReceta from  './CardReceta.vue'
export default {
  
  name: "src-components-buscador-receta",
  components: {
    CardReceta
  },
  props: [],
  async beforeMount() {
    await this.getRecetas();
    await this.getIngredientes();
  },
  data() {
    return {
      urlRecetas: "http://localhost:8080/recetas/",
      urlIngredientes: "http://localhost:8080/ingredientes/",
      ingredientesSeleccionados: [],
      ingredientesTotal: [],
      options: {},
      categoria: "",
      momento: "",
      tituloReceta: "",
      recetas: [],
      mostrarCard: false,
    };
  },
  methods: {
    async getRecetas() {
      try {
        let res = await this.axios(this.urlRecetas);
        let recetas = res.data;
        this.recetas = recetas;

        let categorias = recetas.map((receta) => receta.categoria);
        categorias = [...new Set(categorias)];
        let momentos = recetas.map((receta) => receta.momento);
        momentos = [...new Set(momentos)];
        this.options = { categorias, momentos };
      } catch (error) {
        console.error(error);
      }
    },
    async getIngredientes() {
      try {
        let res = await this.axios(this.urlIngredientes);
        let ingredientes = res.data;
        this.ingredientesTotal = ingredientes.map((ingrediente) => {
          let ingredienteNombre = { nombre: ingrediente.nombre };
          return ingredienteNombre;
        });
      } catch (error) {
        console.error(error);
      }
    },
    filtroIngredientes() {
      if (this.ingredientesSeleccionados.length == 0) {
        return this.recetas;
      } else {
        let recetasSeleccionadas = [];
        this.recetas.forEach((receta) => {
          let contador = 0;
          let ingredientesReceta = receta.ingredientes.map((i) => i.nombre);
          this.ingredientesSeleccionados.forEach((ingrediente) => {
            if (ingredientesReceta.indexOf(ingrediente.nombre) != -1) {
              contador++;
            }
          });
          let recetaCopia = { ...receta };
          recetaCopia.contador = contador;
          recetasSeleccionadas.push(recetaCopia);
        });
        recetasSeleccionadas = recetasSeleccionadas.filter(
          (receta) => receta.contador > 0
        );
        recetasSeleccionadas = recetasSeleccionadas.sort(function (a, b) {
          return b.contador - a.contador;
        });
        return recetasSeleccionadas;
      }
    },
  },
  computed: {
    recetasFiltradas() {
      let recetasFiltradas = this.filtroIngredientes();
      if (this.tituloReceta != "") {
        recetasFiltradas = recetasFiltradas.filter((receta) =>
          receta.titulo.toLowerCase().includes(this.tituloReceta.toLowerCase())
        );
      }
      if (this.categoria != "") {
        recetasFiltradas = recetasFiltradas.filter((receta) =>
          receta.categoria.toLowerCase().includes(this.categoria.toLowerCase())
        );
      }
      if (this.momento != "") {
        recetasFiltradas = recetasFiltradas.filter((receta) =>
          receta.momento.toLowerCase().includes(this.momento.toLowerCase())
        );
      }
      return recetasFiltradas;
    },
  },
  watch: {
    recetasFiltradas: {
      deep: true,
      handler: function() {
        this.mostrarCard = true
      }
    }
  }
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

table {
  width: -moz-available;
}
</style>
