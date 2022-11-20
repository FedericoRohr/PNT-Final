<template>
  <div class="card" @click="mostrarReceta()">
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
            <td>{{ ingrediente.nombre }}</td>
            <td>{{ ingrediente.cantidad }}</td>
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
  props: ["receta"],
  mounted() {
    
  },
  data() {
    return {
      datos: null
    };
  },
  methods: {
    mostrarReceta() {
      this.$store.dispatch("modificarReceta", this.receta)
      this.$router.push('/receta')
    }
  },
  computed: {},
  components: {
  },
};
</script>

<style scoped lang="css">
</style>
