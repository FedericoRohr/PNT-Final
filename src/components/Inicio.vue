<template>

  <section class="src-components-inicio">
    <h1>Hello Kitchen</h1>


    <label for="importe">Busque una receta</label>
    <br>
    <input type="text" v-model="receta">
    
    <div class="table-responsive">
          <table class="table table-dark">
              <tr>
                  <th>Titulo</th>
                  <th>ingredientes</th>
                  <th>descripcion</th>
                  <th>categoria</th>
                  <th>momento</th>
              </tr>

              <tr v-for="(receta,index) in filtrarTitulo" :key="index">
                  <td >{{ receta.titulo }}</td>
                  <td >{{ receta.ingredientes}}</td> 
                  <td >{{ receta.descripcion }}</td> 
                  <td >{{ receta.categoria }}</td> 
                  <td >{{ receta.momento }}</td>
              </tr>
              
          </table>

      </div>

  </section>

</template>

<script>

  export default  {
    name: 'src-components-inicio',
    props: [],
    mounted () {
       this.recetas = this.getPostsAxios()
    },
    data () {
      return {
      receta:"",
      url: 'https://6351ddd1dfe45bbd55ca4dfa.mockapi.io/recetas',
      recetas:[],
      }
    },
    methods: {
      async getPostsAxios() {
        try {
          let respuesta = await this.axios(this.url)
          this.recetas = respuesta.data
        }
        catch(error) { console.error(error) } 

      },
    },
    computed: {
      filtrarTitulo(){
        let receta = this.recetas()
        return receta
      }
    }
}
  
  


</script>

<style scoped lang="css">
  h1{
    color: red;
  }
</style>
