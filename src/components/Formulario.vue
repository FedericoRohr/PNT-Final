<template>
  <section class="src-components-formulario">
    <div class="jumbotron">
      <h1>Formulario Importes y presupuesto </h1>
      <vue-form :state="formState" @submit.prevent="enviar()">
        <!--                                    -->
        <!--            CAMPO NOMBRE            -->
        <!--                                    -->
        <validate tag="div">
          <label for="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.nombre"
            name="nombre"
            required
            :minlength="nombreMinLength"
            :maxLength="nombreMaxLength"
            no-espacios
          />
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>
            <div slot="minlength" class="alert alert-danger mt-1">
              Este campo debe poseer al menos {{ nombreMinLength }} caracteres.
            </div>
            <div slot="no-espacios" class="alert alert-danger mt-1">
              Este campo no permite espacios intermedios
            </div>
            <div slot="no-espacios-principio" class="alert alert-danger mt-1">
              Este campo no permite espacios al principio
            </div>
          </field-messages>
        </validate>
        <br />
        <!--                                                    -->
        <!--                     Descripcion                    -->
        <!--                                                    -->
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
          />

          <field-messages name="descripcion" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>
          </field-messages>
        </validate>

        <!--                                                    -->
        <!--                     IMPORTE                        -->
        <!--                                                    -->

        <validate tag="div">
          <label for="importe">Importe</label>
          <input
            type="number"
            id="importe"
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.importe"
            name="importe"
            required
          />

          <field-messages name="importe" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>
          </field-messages>
        </validate>

        <button class="btn btn-success my-3" :disabled="formState.$invalid">
          Enviar
        </button>
      </vue-form>

      <h1>{{formData}}</h1>

      <h2>Presupuesto</h2>
      <input type="number" v-model="presupuesto">  <br> 


      <div class="table-responsive">
          <table class="table table-dark">
              <tr>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>importe</th>
                  <th>fecha</th>
              </tr>

              <tr v-for="(pago,index) in pagos" :key="index">
                  <td >{{ pago.nombre }}</td>
                  <td>{{ pago.descripcion }}</td>
                  <td>{{"$" + pago.importe }}</td>
                  <td>{{ pago.fechaCreacion }}</td>     
              </tr>
              <tr>
                  <th></th>
                  <th :style="{color: pintarTotal() }">Gasto Total</th>
                  <th :style="{color: pintarTotal() }">{{totales}}</th>
                  <th></th>
              </tr>
              
          </table>

      </div>
    </div>
  
  </section>
  
</template>

<script >
export default {
  name: "src-components-formulario",
  props: [],
  mounted() {},
  data() {
    return {
      formState: {},
      formData: this.getInitialData(),
      nombreMinLength: 3,
      nombreMaxLength: 15,
      pagos:[],
      totales:0,
      presupuesto:'',
    };
  },
  methods: {
    getInitialData() {
      return {
        nombre: null,
        descripcion: null,
        importe: null,
        fechaCreacion: null,
      };
    },
    enviar() {
     this.guardarPago({ ...this.formData });
     this.calcularTotales()
      
      this.formData = this.getInitialData();
      this.formState._reset();
    },
    guardarPago(pago) {
      pago.fechaCreacion = new Date().toLocaleString();
      this.pagos.push(pago);
    },
    calcularTotales(){
      let importe = 0 
      this.pagos.forEach(pago => importe+= Number(pago.importe) )
      this.totales = importe
    },
    pintarTotal() {
      if(this.presupuesto<this.totales && this.presupuesto != ''){ /// primero se fija el presupuesto por sobre el resto 
      return 'red'
      }

    if(this.totales<999 ){
      return 'green'
    }else if(this.totales<5001){
      return 'magenta'
    }else{
      return 'orange'
    }
    },

  },
  computed: {


  },
};
</script>

<style scoped lang="css">
.jumbotron {
  background-color: cornflowerblue;
  color: navy;
}
</style>
