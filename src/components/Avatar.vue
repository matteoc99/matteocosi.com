<script setup lang="ts">

defineProps<{
  isSmall: boolean,
  src: string
}>()

</script>

<template>
  <div
    class=" inline-block overflow-hidden rounded-full "
    :class="[isSmall ? 'animate-shrink' : 'w-60 h-60']"
  >
    <img
      :src="src"
      alt="My profile picture"
      class="rounded-full object-cover w-full h-full"
      :class="[isSmall ? 'animate-focusin' : '']"
    >
  </div>
</template>

<style scoped>

</style>