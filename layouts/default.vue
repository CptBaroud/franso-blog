<template>
  <div class="overflow-hidden app">
    <SiteHeader />
    <div>
      <NuxtPage />
    </div>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteFooter from "@/components/SiteFooter.vue";
// @ts-ignore
import SiteHeader from "@/components/SiteHeader.vue";

useHead({
  title: "Franso blog",
});
</script>

<style scoped>
.app {
  @apply bg-light dark:bg-dark;
  background-image: url("~/assets/images/bg-index.png");
}
</style>
