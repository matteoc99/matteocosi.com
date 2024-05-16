<script setup lang="ts">

import Footer from "../components/Footer.vue";
import NavBar from "../components/NavBar.vue";
</script>

<template>
  <NavBar/>
  <div class="container mt-32">
    <slot name="default" class="mt"/>
  </div>
  <Footer/>
</template>

<style scoped>

</style>