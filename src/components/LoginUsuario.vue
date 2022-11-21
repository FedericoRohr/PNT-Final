<template>
  <section class="src-componentes-formulario">
    <div class="jumbotron">
      <h2>Login de usuario</h2>
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
          />
          <!-- mensajes de validación -->
          <field-messages name="username" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>
            <div slot="minlength" class="alert alert-danger mt-1">
              Este campo debe poseer al menos
              {{ usernameMinLength }} caracteres.
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
      <div class="alert alert-danger" role="alert" v-if="error">
        Usuario o contraseña invalido
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "src-componentes-login-usuario",
  props: [],
  mounted() {},
  data() {
    return {
      formState: {},
      formData: this.getInitialData(),
      usernameMinLength: 3,
      url: "http://localhost:8080/usuarios",
      datos: {},
      error: false,
    };
  },
  methods: {
    getInitialData() {
      return {
        username: null,
        password: null,
      };
    },
    async enviar() {
      try {
        this.datos = { ...this.formData };
        let { data: res } = await this.axios.post(this.url, this.datos, {
          "content-type": "application/json",
        });
        console.log(res);
        if (res.permiso == "concedido") {
          this.$store.dispatch("loginUsuario", {
            username: this.datos.username,
          });
          this.$router.push("/");
        } else {
          this.formData = this.getInitialData();
          this.datos = {};
          this.formState._reset();
          this.error = true;
        }
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
  background-color: teal;
  color: white;
}
hr {
  background-color: #bbb;
}
pre {
  color: white;
}
</style>