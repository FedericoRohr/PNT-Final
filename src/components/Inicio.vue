
<template>
  <section class="src-components-inicio">
    <h1>Hello Kitchen</h1>

    <label for="importe">Busque una receta</label>
    <br />
    <input type="text" v-model="receta" />

    <div class="table-responsive">
      <table class="table table-dark">
        <tr>
          <th>Titulo</th>
          <th>ingredientes</th>
          <th>descripcion</th>
          <th>categoria</th>
          <th>momento</th>
        </tr>

        <tr v-for="(receta, index) in filtrarTitulo" :key="index">
          <td>{{ receta.titulo }}</td>
          <td>{{ receta.ingredientes }}</td>
          <td>{{ receta.descripcion }}</td>
          <td>{{ receta.categoria }}</td>
          <td>{{ receta.momento }}</td>
        </tr>
      </table>
    </div>

    <h1>filtro</h1>
    <MultiSelect v-model="ingredientesSelecionados" :options="ingredientesTotal" optionLabel="nombre"/> <!--  :filter="true" -->
   <!--  https://www.primefaces.org/primevue-v2/#/multiselect -->


  </section>
</template>

<script>
export default {
  name: "src-components-inicio",
  props: [],
  mounted() {
    this.getIngredientes();
    this.getRecetas();
  },
  data() {
    return {
      receta: "", //buscardor de receta por titulo
      urlReceta: "https://635723ad9243cf412f93b0b0.mockapi.io/recetas",
      urlIngrediente:
        "https://635723ad9243cf412f93b0b0.mockapi.io/ingredientes",
      recetas: [], // recetas obtenidas mediante request
      ingredientesTotal: [],   //ingredientes obtenidos mediante request
      ingredientesSelecionados:[] // ingredientes seleccionados usuario
      /* { "nombre": "Coliflor"},{"nombre": "Tomate"},{ "nombre": "Queso parmesano"} */
    };
  },
  methods: {
    async getRecetas() {
      try {
        let respuesta = await this.axios(this.urlReceta);
        this.recetas = respuesta.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getIngredientes() {
      try {
        let respuesta = await this.axios(this.urlIngrediente);
        this.ingredientesTotal = respuesta.data;
      } catch (error) {
        console.error(error);
      }
    },
    filtrarIngredientes() {
      if(this.ingredientesSelecionados.length!= 0){ // en caso de no tener ingredientes devuelve la totalidad de recetas y avisa no estar filtrando
        let recetasFiltradas = [];
      this.recetas.forEach((element) => { // recorre las recetas
        let contador = 0;
        let ingredientesReceta = element.ingredientes.map((i) => i.nombre); /// obtiene array de los ingredientes de esa receta
        this.ingredientesSelecionados.forEach((ingr) => {  // recorre los ingredientes seleccionados por el usuario
          if (ingredientesReceta.indexOf(ingr.nombre)!=-1) {  // si encuentra coincidencia suma uno
            contador++;
          }
        });
        let recetaCopia = {...element};
        recetaCopia.contador = contador;
       
        recetasFiltradas.push(recetaCopia);
      });
    
      recetasFiltradas = recetasFiltradas.filter(  //filtra las que coincide por lo menos un ingrediente
        (element) => element.contador > 0
      );
      
       recetasFiltradas = recetasFiltradas.sort(function(a, b){return b.contador - a.contador}); // orden por mayor coincidencia
      
      return {"recetas" : recetasFiltradas, "filtro" : true};
      }else{
        return {"recetas" : this.recetas, "filtro" : false}
      }
      
    },
  },
  computed: {
    filtrarTitulo() {
      let totalidadRecetas =this.filtrarIngredientes().recetas
      let filtroIngredientes = this.filtrarIngredientes().filtro
      let filtroUsandose = this.receta != "" && this.receta != " "
      if (filtroUsandose) {  //  no me importa si se esta usando el otro filtro (responsabilidad del otro metodo)
        let filtradasTitulo = totalidadRecetas.filter((receta) => {
          return receta.titulo
            .toLowerCase()
            .includes(this.receta.toLowerCase());
        });
        return filtradasTitulo;
      }else if (!filtroUsandose &&filtroIngredientes ){ // su no se usa el filtro titulos pero si por ingredientes
        return totalidadRecetas
      }else{
        return null
      } 
    },
  },
};
</script>

<style scoped lang="css">
h1 {
  color: red;
}
</style>
