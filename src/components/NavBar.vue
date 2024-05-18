<script setup lang="ts">
import {computed, ref, watchEffect}                                         from 'vue';
import {useBrowserLocation, useDark, useToggle, useWindowScroll, watchOnce} from "@vueuse/core";
import {ChevronDown, Moon, Sun}                                             from 'lucide-vue-next';

const isDark = useDark({
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
});

const toggleDark = useToggle(isDark)

const location = useBrowserLocation()
const {pathname} = location.value


const isDone = ref(pathname !== '/');
const shouldShrink = ref(false);

const isSmall = computed(() => {
  return isDone.value || shouldShrink.value

});


const {y} = useWindowScroll({
  behavior: "smooth",
})
watchEffect(() => shouldShrink.value = y.value > 80)


const watchIsDone = () => {
  watchOnce(isSmall, () => {
    if (isSmall) {
      isDone.value = true;
      y.value = 0;
    }
  })
}

watchIsDone()
const restore = () => {
  if(pathname && pathname!== '/'){
    window.location.replace(window.location.href.replace(pathname,""))
    return;
  }

  isDone.value = false;
  y.value = 0;

  setTimeout(() => {
    watchIsDone();
  }, 500)

}
</script>

<template>
  <header
    id="navbar"
    class="w-screen h-screen top-0 z-50 bg-navbar text-navbar-foreground fixed transition-all duration-500 ease-in-out shadow-xl "
    :class="{small:isSmall}"
    ref="el"
  >
    <div class="container mx-auto flex justify-between items-center px-4 h-full w-full">
      <div class="w-full h-full flex items-center">
        <div
          @click="restore()"
          class="name cursor-pointer"
          :class="[isSmall ? 'text-xl' : 'text-3xl', 'font-bold transition-all text-primary']">
          Matteo Cosi
        </div>
      </div>
      <nav class="flex space-x-4" v-if="isSmall">
        <a href="/projects" class="flat-link-primary">Projects</a>
        <a href="/contact" class="flat-link-primary">Contact</a>
        <div class="fill-button-primary" @click="toggleDark()">
          <Moon v-if="isDark"/>
          <Sun v-else/>
        </div>
      </nav>
    </div>
    <div class="h-12 w-full absolute bottom-10 flex justify-center ">
      <ChevronDown
        @click="isDone=true"
        v-if="!isSmall"
        class="h-12 w-12 text-primary animate-bounce cursor-pointer"/>

    </div>
  </header>
</template>


<style scoped>

#navbar.small {
  height: 80px;
}

.name {
  transition: transform 0.5s ease, font-size 0.5s ease;
}


</style>
