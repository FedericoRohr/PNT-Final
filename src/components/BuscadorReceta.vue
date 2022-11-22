<template>
  <section class="src-components-buscador-receta">
    <div class="jumbotron">
      <br />
      <ul class="list-group buscador my-3 ">        
        <li class="list-group-item pb-4">
          <h2 class="mt-2">Buscá tu receta</h2>
          <table style="color: black" class="container-fluid">
            <tr class="col-12">
              <td style="padding: 0px 20px 0px 0px" class="col-4">
                <label for="titulo">Nombre receta</label>
                <input
                  type="text"
                  class="form-control"
                  id="titulo"
                  name="titulo"
                  v-model.trim="tituloReceta"
                  placeholder="Nombre de receta..."
                />
              </td>
              <td style="padding: 0px 20px 0px 0px" class="col-4">
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
              <td class="col-4" style="padding: 0px 0px 0px 0px">
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
        
        <li class="list-group-item pb-4" >
          <p>Ingredientes</p>
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
            class="w-100"
          />
        </li>
      </ul>
    </div>
    <!-- ------------------------------------------------------- -->
    <!--                       CARDS                             -->
    <!-- ------------------------------------------------------- -->

    <div v-if="mostrarCard">
      <div
        class="jumbotron2"
        style="color: black"
        v-if="recetasFiltradas.length > 0"
      >
        <div class="card-columns">
          <div
            class="col mb-4"
            v-for="(receta, index) in recetasFiltradas"
            :key="index"
          >
            <CardReceta :receta="receta" :ingredientes="ingredientesSeleccionadosNombre"/>
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
        let ingredientesTotal = ingredientes.map((ingrediente) => {
          let ingredienteNombre = { nombre: ingrediente.nombre };
          return ingredienteNombre;
        })
        ingredientesTotal.sort()
        this.ingredientesTotal = ingredientesTotal
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
    ingredientesSeleccionadosNombre() {
      return this.ingredientesSeleccionados.map((element) => element.nombre)
    }
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
  background-image: url("../images/receta-de-torta-oreo-800x534.jpg");
  color: white;
  background-size: cover; 
  height: 75vh; 
}

.jumbotron2{
  padding: 30px 10px;
  background-color: #2f2f2fb3;
  color: white;
  background-size: cover;
}


hr {
  background-color: #bbb;
}

.list-group-item{
  background-color: #2f2f2fac!important;
}

table {
  width: -moz-available;
}
label{
  color: white;
}
</style>
