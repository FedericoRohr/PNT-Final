<template>
  <section class="src-componentes-formulario">
    <div class="jumbotron" v-if="!emailEnviado">
      <h2>Subscribite al newsletter</h2>
      <br />

      <vue-form :state="formState" @submit.prevent="enviar()">
        <!-- ----------------------------------- -->
        <!--            CAMPO EMAIL              -->
        <!-- ----------------------------------- -->
        <validate tag="div">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.email"
            name="email"
            required
            placeholder="Ingresa tu email..."
          />
          <!-- Se le pone name igual al del field-messages para que queden relacionados -->

          <!-- Mensajes de validación -->
          <field-messages name="email" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>
            <div slot="email" class="alert alert-danger mt-1">
              Email no válido
            </div>
          </field-messages>
        </validate>

        <br />

        <button class="btn btn-success my-3" :disabled="formState.$invalid">
          Subscribir
        </button>
      </vue-form>
    </div>
    <div class="jumbotron" v-else>
      <h2>Email enviado!</h2>
    </div>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'src-components-subscribir-newsletter',
    props: [],
    mounted () {

    },
    data () {
      return {
        email: "",
        formState: {},
        formData: this.getInitialData(),
        url: "http://localhost:8080/usuarios/enviarMail",
        datos: {},
        emailEnviado: false
      }
    },
    methods: {
      getInitialData() {
      return {
        email: null
      }
      },
      async enviar() {
        this.datos = { ...this.formData };
        await this.axios.post(this.url, this.datos, {
          "content-type": "application/json",
        })
        this.emailEnviado = true;
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
</style>
