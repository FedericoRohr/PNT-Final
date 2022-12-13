<template>
  <div class="card cardHover" @click="mostrarReceta()" :style="{'background-color': todosLosIngredientes ? '#c9ffc7': 'white'}">
    <div class="card-body">
      <h2 class="card-title">
        {{ receta.titulo }}
      </h2>
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">Ingredientes</th>
            <th scope="col">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ingrediente, index) in receta.ingredientes" :key="index">
            <td v-if="ingredientes.indexOf(ingrediente.nombre) == -1">
              {{ ingrediente.nombre | formatoIngrediente }}
            </td>
            <td v-else>
              <b>{{ ingrediente.nombre | formatoIngrediente }}</b>
            </td>
            <td v-if="ingredientes.indexOf(ingrediente.nombre) == -1">
              {{ ingrediente.cantidad }}
            </td>
            <td v-else>
              <b>{{ ingrediente.cantidad }}</b>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="card-text">
        {{ receta.descripcion }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "src-components-card-receta",
  props: ["receta", "ingredientes"],
  mounted() {},
  data() {
    return {
      datos: null,
    };
  },
  methods: {
    mostrarReceta() {
      this.$store.dispatch("modificarReceta", this.receta);
      this.$router.push("/receta");
    },
  },
  computed: {
    todosLosIngredientes() {
      for (let i = 0; i < this.receta.ingredientes.length; i++) {
        const ingrediente = this.receta.ingredientes[i];
        if (this.ingredientes.indexOf(ingrediente.nombre) == -1) {
          return false
        } 
      }
      return true
    }
  },
  components: {},
};
</script>

<style scoped  lang="css">
.cardHover:hover {
  background-color: #d9553b;
  transition: 1s;
  cursor: pointer;
}
</style>
