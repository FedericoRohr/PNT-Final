<template>

  <section class="src-components-ingreso-gastos">
    <div class="jumbotron">
      <h2>Ingresa una receta</h2>
      <br>

      <vue-form :state="formState" @submit.prevent="enviar()">
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
              v-model="formData.titulo"
              name="titulo" 
              required
              :minlength="tituloMinLength"
            >
            <field-messages name="nombre" show="$dirty">
              <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
              <div slot="minlength" class="alert alert-danger mt-1">Este campo debe poseer al menos {{ nombreMinLength }} caracteres</div>
            </field-messages>
          </validate>        

          <br>

          <!-- ----------------------------------- -->
          <!--         CAMPO DESCRIPCIÓN           -->
          <!-- ----------------------------------- -->
          <validate tag="div">
            <label for="descripcion">Descripción</label>
            <input 
              type="text" 
              id="descripcion" 
              class="form-control" 
              autocomplete="off"
              v-model.trim="formData.descripcion"
              name="descripcion" 
              required
            >
            <field-messages name="descripcion" show="$dirty">
              <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            </field-messages>
          </validate>    

          <br>

          <!-- ----------------------------------- -->
          <!--         CAMPO INGREDIENTES          -->
          <!-- ----------------------------------- -->
          <validate tag="div">
            <label for="ingrediente">Ingredientes</label>
            <input 
              type="text" 
              id="ingrediente" 
              class="form-control" 
              autocomplete="off"
              v-model.number="formData.ingrediente"
              name="ingrediente" 
              required
            > 
            <field-messages name="ingrediente" show="$dirty">
              <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            </field-messages>
          </validate>

          <br>

          <button class="btn btn-success my-3" :disabled="formState.$invalid">Enviar</button>
      </vue-form>

      <br>
      <br>
      <h2>Tabla de Gastos</h2>
      <hr>
      <hr>

      <div class="form-group">
        <label for="presupuesto"><i><b>Presupuesto:</b></i></label>
        <input type="number" v-model="presupuesto" class="form-control" id="presupuesto"  placeholder="Ingresa un presupuesto">
      </div>

      <hr>

      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Importe</th>
            <th scope="col">Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dato,index) in datos" v-bind:key="index">
            <td>{{ dato.nombre }}</td>
            <td>{{ dato.descripcion }}</td>
            <td>{{ `$ ${dato.importe}` }}</td>
            <td>{{ dato.timestamp }}</td>
          </tr>
          <tr :style="{'color': gastoTotal().color}">
            <td></td>
            <td><b>TOTAL</b></td>
            <td><b>{{ `$ ${gastoTotal().gastoTotal}` }}</b></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

</template>

<script>

  export default  {
    name: 'src-components-ingreso-gastos',
    props: [],
    mounted () {

    },
    data () {
      return {
        formData: this.getInitialData(),
        formState: {},
        datos: [],
        nombreMinLength: 3,
        nombreMaxLength: 15,
        limiteVerde: 1000,
        limiteNaranja: 5000,
        presupuesto: ""
      }
    },
    methods: {
      getInitialData() {
        return {
          nombre: null,
          descripcion: null,
          importe: null,
          timestamp: null
        }
      },
      enviar() {
        this.formData.timestamp = new Date().toLocaleString()
        this.datos.push(this.formData)
        this.formData = this.getInitialData()
        this.formState._reset()
      },
      gastoTotal() {
        let gastoTotal = this.datos.reduce((prev, curr) => {
          return prev + curr.importe
        }, 0)
        let color = "white"
        if (this.presupuesto != "" && gastoTotal > this.presupuesto) {
          color = "red"
        }
        else if (this.datos.length > 0 ){
          if (gastoTotal < this.limiteVerde) {
            color = "green"
          }
          else if (gastoTotal > this.limiteNaranja) {
            color = "orange"
          }
          else {
            color = "magenta"
          }
        }
        return {gastoTotal, color}
      }
    },
    computed: {
      
    }
}


</script>

<style scoped lang="css">
  .jumbotron {
    background-color: teal;
    color: white;
  }

  hr {
    background-color: #bbb;
  }
</style>
