<template>
  <header class="header">
    <nav class="header-nav">
      <div class="w-full">
        <h1
          class="lg:text-3xl text-xl font-bold text-black dark:text-white uppercase my-0"
        >
          <NuxtLink to="/"> Franso's blog </NuxtLink>
        </h1>
      </div>
      <div class="w-full inline-flex items-center justify-end">
        <ul class="flex flex-row px-8 gap-4">
          <NuxtLink class="nav-item" to="/blog"> Blog </NuxtLink>
          <a
            href="https://www.youtube.com/@Fransosiche/videos"
            target="_blank"
            class="nav-item"
            >Videos</a
          >
        </ul>
        <a class="text-gray-900 dark:text-white" @click="setTheme">
          <transition name="fade">
            <iconLight v-if="colorMode.preference === 'light'" />
            <iconDark v-else />
          </transition>
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import iconLight from "../assets/icons/icon-sun.svg?component";
import iconDark from "~/assets/icons/icon-moon.svg?component";

const colorMode = useColorMode();

function setTheme() {
  if (colorMode.preference === "dark") {
    colorMode.preference = "light";
  } else {
    colorMode.preference = "dark";
  }
}
</script>

<style lang="scss" scoped>
.header {
  @apply bg-transparent flex justify-center font-Inconsolata fixed z-50 py-4;
}

.header-nav {
  @apply bg-white/50 dark:bg-black/50 rounded-lg flex flex-row items-center justify-between max-w-[1200px] w-full px-6 py-2;
  backdrop-filter: blur(9px);
}

.nav-item {
  @apply lg:text-2xl text-base font-bold text-gray-900 dark:text-white;
}

.nav-modal {
  @apply w-full;
}
</style>
