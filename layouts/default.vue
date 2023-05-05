<template>
  <div>
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
