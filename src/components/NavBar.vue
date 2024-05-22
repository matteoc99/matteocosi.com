<script setup lang="ts">
import {type Ref, ref, watch}                             from 'vue';
import {useBrowserLocation, useDark, useSwipe, useToggle} from '@vueuse/core';
import {ChevronDown, Moon, Sun}                           from 'lucide-vue-next';
import {useWheel}                                         from "@vueuse/gesture";
import Avatar                                             from "./Avatar.vue";

const isDark = useDark({
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
});
const toggleDark = useToggle(isDark);

const navbar: Ref<HTMLElement | null> = ref(null);

const {isSwiping, direction} = useSwipe(navbar)


useWheel(({wheeling}) => {
  if (wheeling) {
    isSmall.value = true;
  }
}, {
  domTarget: navbar,
})


const location = useBrowserLocation();
const {pathname} = location.value;
const isSmall = ref(pathname !== '/');


watch(isSwiping, () => {
  if (isSwiping.value
    && ['up', 'down'].includes(direction.value)) {
    isSmall.value = direction.value === "up";
  }
})

const links = [
  // {path: '/projects', name: 'Projects'},
  // {path: '/contact', name: 'Contact'},
];

</script>

<template>
  <header
    ref="navbar"
    class="w-screen top-0 z-10 bg-navbar text-navbar-foreground fixed transition-all duration-700 ease-in-out shadow-xl"
    :class="[isSmall ? 'h-20': 'h-screen']"
  >
    <div class="container mx-auto flex justify-between px-4 h-full w-full">
      <div class="w-full h-full flex items-center  content-center gap-4"
      :class="[isSmall?'flex-nowrap':'flex-wrap justify-center']">
        <Avatar :isSmall src="/img/me.jpeg"/>
        <div>
          <div v-if="!isSmall &&isSmall">
            <span class="intro-text">Hi!</span>
            <br>
            <span class="intro-text">I am </span>
          </div>
          <a
            href="/"
            class="cursor-pointer h-full flex items-center transition-all duration-700 "
            :class="[isSmall ? 'text-xl' : 'text-3xl', 'font-bold transition-all text-primary']"
          >
            Matteo Cosi
          </a>
        </div>
      </div>
      <nav class="flex space-x-4 h-full items-center" v-if="isSmall">
        <template v-for="{ path, name } in links" :key="path">
        <a :href="path" class="flex items-center h-full cursor-pointer flat-link z-50">
            <span
              :class="[pathname?.startsWith(path) ? 'active' : '']"
              class="flat-link-primary h-fit inline-block"
            >
              {{ name }}
            </span>
        </a>
        </template>
        <div class="fill-button-primary h-fit" @click="toggleDark()">
          <Moon v-if="isDark"/>
          <Sun v-else/>
        </div>
      </nav>

    </div>

    <div class="h-12 w-full absolute bottom-10 flex justify-center" v-if="!isSmall">
      <ChevronDown
        @click="isSmall = true"
        class="h-12 w-12 text-primary animate-bounce cursor-pointer"
      />
    </div>
  </header>
</template>

<style scoped>

</style>
