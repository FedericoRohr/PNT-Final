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
            <td v-if="ingredientes.indexOf(ingrediente.nombre) == -1">{{ ingrediente.nombre }}</td>
            <td v-else><b>{{ ingrediente.nombre }}</b></td>
            <td v-if="ingredientes.indexOf(ingrediente.nombre) == -1">{{ ingrediente.cantidad }}</td>
            <td v-else><b>{{ ingrediente.cantidad }}</b></td>
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
