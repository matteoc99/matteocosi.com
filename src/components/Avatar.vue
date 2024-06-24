<script setup lang="ts">

import {shallowRef, watch} from "vue";

const props = defineProps<{
  isSmall: boolean,
  src: string
}>()

const becameSmall = shallowRef(false)


watch(() => props.isSmall, () => {
  becameSmall.value = props.isSmall;
});
</script>

<template>
  <div
    class=" inline-block overflow-hidden rounded-full "
    :class="[isSmall ? 'animate-shrink' : 'w-60 h-60',becameSmall?'':'duration-0']"
  >
    <img
      :src="src"
      alt="My profile picture"
      class="rounded-full object-cover w-full h-full"
      :class="[isSmall ? 'animate-focusin' : '', becameSmall? '':'duration-0']"
    >
  </div>
</template>

<style scoped>

</style>