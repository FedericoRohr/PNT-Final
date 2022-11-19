<template>
  <div id="app">
    <div class="container-fluid mt-3">
      <div class="jumbotron">
        <NavBar />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  }
}
</script>

<style>
</style>
