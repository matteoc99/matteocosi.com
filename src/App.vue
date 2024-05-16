<script setup lang="ts">
import Portfolio from "./pages/Portfolio.vue";
import {useEventListener} from "@vueuse/core";
import {onMounted} from "vue";

onMounted(() => {
  const resetScroll = () => {
    window.scrollTo(0, 0);
  };

  useEventListener(window, 'beforeunload', resetScroll);
});


</script>

<template>
  <Portfolio/>
</template>

<style scoped>

</style>
