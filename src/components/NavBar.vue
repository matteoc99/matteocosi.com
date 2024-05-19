<script setup lang="ts">
import {computed, type Ref, ref, watch} from 'vue';
import {
  useBrowserLocation,
  useDark,
  useMouse,
  useMousePressed,
  useSwipe,
  useToggle,
  watchThrottled
}                                       from '@vueuse/core';
import {
  ChevronDown,
  Moon,
  Sun
}                                       from 'lucide-vue-next';
import {
  useWheel
}                                       from "@vueuse/gesture";

const SMALL_SIZE = 80;
const MOUSE_MOVE_THRESHOLD = 50;

const isDark = useDark({
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
});
const toggleDark = useToggle(isDark);

const navbar: Ref<HTMLElement | null> = ref(null);

const {isSwiping} = useSwipe(navbar)

useWheel(({wheeling}) => {
  if (wheeling) {
    isSmall.value = true;
  }
}, {
  domTarget: navbar,
})
const {y: mouseY, sourceType} = useMouse()

const {pressed} = useMousePressed()


const location = useBrowserLocation();
const {pathname} = location.value;

const isSmall = ref(pathname !== '/');

let lastMouseY = mouseY.value;

const isDragging = computed(() => {
  if (sourceType.value === "touch") {
    return isSwiping.value;
  }
  return pressed.value
})


watchThrottled([isDragging, mouseY], () => {
  if (isDragging.value) {
    if (Math.abs(mouseY.value - lastMouseY) >= MOUSE_MOVE_THRESHOLD) {
      lastMouseY = mouseY.value;
      if (mouseY.value < SMALL_SIZE * 3) {
        makeSmall()
      } else {
        setHeight(mouseY.value)
      }
    }
  }
}, {throttle: 50})

watch(isDragging, () => {
  if (!isDragging.value) {
    if (mouseY.value > window.screen.height / 2) {
      makeBig()
    } else {
      makeSmall()
    }
  }
})

watch(isSmall, () => {
  resize();
})


const resize = () => {
  if (isSmall.value) {
    setHeight(SMALL_SIZE)
  } else {
    setHeight(null)
  }
}
const makeBig = () => {
  isSmall.value = false;
  resize();
};

const makeSmall = () => {
  isSmall.value = true;
  resize();
}

const setHeight = (px: number | null) => {
  if (navbar.value) {
    if (!px) {
      navbar.value.style.height = ''
    } else {
      navbar.value.style.height = `${px}px`;
    }
  }
}

const links = [
  {path: '/projects', name: 'Projects'},
  {path: '/contact', name: 'Contact'},
];
</script>

<template>
  <header
    ref="navbar"
    class="w-screen h-screen top-0 z-10 bg-navbar text-navbar-foreground fixed transition-all duration-500 ease-in-out shadow-xl"
    :class="{ small: isSmall }"
  >
    <div class="container mx-auto flex justify-between items-center px-4 h-full w-full">
      <div class="w-full h-full flex items-center">
        <a
          href="/"
          class="name cursor-pointer h-full flex items-center"
          :class="[isSmall ? 'text-xl' : 'text-3xl', 'font-bold transition-all text-primary']"
        >
          Matteo Cosi
        </a>
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
    <div class="h-12 w-full absolute bottom-10 flex justify-center">
      <ChevronDown
        @click="isSmall = true"
        v-if="!isSmall"
        class="h-12 w-12 text-primary animate-bounce cursor-pointer"
      />
    </div>
  </header>
</template>

<style scoped>

.name {
  transition: transform 0.5s ease, font-size 0.5s ease;
}
</style>
