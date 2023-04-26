<template>
  <header class="flex justify-center font-Inconsolata">
    <nav class="flex flex-row justify-between max-w-[1200px] w-full">
      <div class="w-full">
        <h1 class="text-3xl font-bold text-black dark:text-white uppercase">
          <NuxtLink to="/"> Franso's blog </NuxtLink>
        </h1>
      </div>
      <div class="w-full inline-flex items-center justify-end">
        <ul class="flex flex-row px-8 gap-4">
          <NuxtLink class="nav-item" to="/blog"> Blog </NuxtLink>
          <!-- <li class="nav-item">Videos</li> -->
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
.nav-item {
  @apply text-2xl font-bold text-gray-900 dark:text-white;
}

.nav-modal {
  @apply w-full;
}
</style>
