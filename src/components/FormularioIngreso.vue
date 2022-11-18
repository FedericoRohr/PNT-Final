<template>
  <section class="src-componentes-formulario">
    <div class="jumbotron">
      <h2>Formulario</h2>
      <hr />
      <hr />
      <br />

      <vue-form :state="formState" @submit.prevent="enviar()">
        <!-- ----------------------------------- -->
        <!--            CAMPO USUARIO            -->
        <!-- ----------------------------------- -->
        <validate tag="div">
          <label for="username">Usuario</label>
          <input
            type="text"
            id="username"
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.username"
            name="username"
            required
            :minlength="usernameMinLength"
            :maxlength="usernameMaxLength"
          />
          <!-- mensajes de validación -->
          <field-messages name="username" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>
            <div slot="minlength" class="alert alert-danger mt-1">
              Este campo debe poseer al menos {{ usernameMinLength }} caracteres.
            </div>
            <div slot="maxLength" class="alert alert-danger mt-1">
              Este campo debe poseer al menos {{ usernameMaxLength }} caracteres.
            </div>
          </field-messages>
        </validate>

        <br />

        <!-- -------------------------------------- -->
        <!--            CAMPO CONTRASEÑA            -->
        <!-- -------------------------------------- -->
        <validate tag="div">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.password"
            name="password"
            required
          />
          <!-- mensajes de validación -->
          <field-messages name="password" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>
          </field-messages>
        </validate>

        <br />

        <button class="btn btn-success my-3" :disabled="formState.$invalid">
          Enviar
        </button>
      </vue-form>

    </div>
  </section>
</template>

<script>
export default {
  name: "src-componentes-formulario",
  props: [],
  mounted() {},
  data() {
    return {
      formState: {},
      formData: this.getInitialData(),
      usernameMinLength: 3,
      usernameMaxLength: 15,
      ruta:"http://localhost:8080/usuarios",
    };
  },
  methods: {
    getInitialData() {
      return {
        username: null,
        password: null
      };
    },
    enviar() {
      this.metodoPost({...this.formData})
      this.formData = this.getInitialData();
      console.log({...this.formData})
      this.formState._reset();
    },
    async metodoPost(usuario, contra){
      try {
        console.log({usuario, contra})
          let {data: res} = await this.axios.post(this.ruta,{username: usuario, password: contra}, {"content-type": "aplication/json"})
          console.log(res)
        }
        catch(error) { console.error(error) } 
    },
    async getPostsAxios() {
        try {
          let post = await this.axios(this.ruta)
          //this.usuarios = post.data
          console.log(post.date)
        }
        catch(error) { console.error(error) } 

      }
  },
  computed: {},
};
</script>

<style scoped lang="css">
.jumbotron {
  background-color: purple;
  color: white;
}

hr {
  background-color: #bbb;
}

pre {
  color: white;
}
</style>
