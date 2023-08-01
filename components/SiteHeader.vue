<template>
  <header class="header">
    <nav class="header-nav">
      <div class="w-full">
        <h1 class="lg:text-3xl text-xl font-bold text-black dark:text-white uppercase my-0">
          <NuxtLink to="/"> {{ $t('headermsg') }}</NuxtLink>
        </h1>
      </div>
      <div class="w-full inline-flex items-center justify-end">
        <ul class="flex flex-row px-8 gap-4">
          <NuxtLink class="nav-item" to="/blog"> Blog </NuxtLink>
          <a href="https://www.youtube.com/@Fransosiche/videos" target="_blank" class="nav-item">Videos</a>
          <NuxtLink :to="switchLocalePath($i18n.locale === 'EN' ? 'FR' : 'EN')" class="nav-item">
            {{ $i18n.locale === 'EN' ? 'FR' : 'EN' }}
          </NuxtLink>
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

const switchLocalePath = useSwitchLocalePath();

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
  @apply bg-transparent flex justify-center font-Inconsolata z-50 py-16 px-0 md:px-8;
}

.header-nav {
  @apply bg-white/75 dark:bg-dark/75 rounded-lg flex flex-row items-center justify-between max-w-[1200px] w-full py-2 px-8;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-sizing: border-box;
}

.nav-item {
  @apply lg:text-2xl text-base font-bold text-gray-900 dark:text-white;
}

.nav-modal {
  @apply w-full;
}
</style>
