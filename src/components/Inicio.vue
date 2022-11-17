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
  </section>
</template>

<script>
export default {
  name: "src-components-inicio",
  props: [],
  mounted() {
    this.getIngredientes()
    this.getRecetas()
     /* console.log(this.getPost(this.urlIngrediente))
     console.log(this.getPost(this.urlReceta)) */
    /* this.getPost(this.urlIngrediente)
    this.getPost(this.urlReceta) */
  },
  data() {
    return {
      receta: "",
      urlReceta: "https://635723ad9243cf412f93b0b0.mockapi.io/recetas",
      urlIngrediente:
        "https://635723ad9243cf412f93b0b0.mockapi.io/ingredientes",
      recetas:[],
      ingredientes:[],
      recetasXIngrediente:[],
    };
  },
  methods: {
    async getPost(url) {
      try {
        let respuesta = await this.axios(url)
        return respuesta.data;
      } catch (error) {
        console.error(error);
      }
    },
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
        this.ingredientes = respuesta.data; 
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    filtrarTitulo() {
      let totalidadRecetas = this.recetas;
      if (this.receta != "" && this.receta != " ") {
        let filtradasTitulo = totalidadRecetas.filter((receta) => {
          return receta.titulo
            .toLowerCase()
            .includes(this.receta.toLowerCase());
        });
        return filtradasTitulo;
      } else {
        return null;
      }
    },
   /*  filtrarIngredientes(ingredientes){
      let recetasFiltradas = []
      this.recetas.forEach(element => {
      ingredientes.forEach()
    });
    } */
  },
};
</script>

<style scoped lang="css">
h1 {
  color: red;
}
</style>
