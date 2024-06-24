<script setup lang="ts">

import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "./ui/dropdown-menu";
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <slot name="trigger"/>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="flex flex-col">
      <slot name="default"/>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped>

</style>