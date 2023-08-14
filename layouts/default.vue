<template>
  <div class="overflow-hidden app">
    <SiteHeader />
    <div class="h-full">
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
  @apply min-h-[100vh] bg-light dark:bg-dark flex flex-col justify-between;
  background-image: url("~/assets/images/bg-index.png");
}
</style>
