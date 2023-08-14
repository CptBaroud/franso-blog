<template>
  <section class="hero">
    <div class="container pt-32">
      <h1 class="title" :class="{ dark: isDark }">
        Find My <br />
        <span> Articles</span>
      </h1>
    </div>
  </section>
  <BlogArticles class="bg-none" :is-home-page="false" />
  <!-- <BlobDecoration :small="4" :large="0" :medium="1">
    <BlogArticles class="bg-none" :is-home-page="false" />
  </BlobDecoration> -->
</template>

<script setup lang="ts">
// @ts-ignore
import BlobDecoration from "@/components/BlobDecoration.vue";
// @ts-ignore
import BlogArticles from "~~/components/BlogArticles.vue";

const isDark = useTheme();
</script>

<style lang="scss">
.bgDecoration {
  @apply absolute z-0;
}

.container {
  @apply pt-12;
}

.hero {
  @apply flex flex-col justify-center items-center gap-8 xl:gap-48 pt-12 xl:pt-24;

  .container {
    @apply justify-start;
  }
}

.title {
  @apply text-5xl xl:text-6xl font-Inconsolata uppercase font-black text-black dark:text-white;
  text-shadow: 0px 0px 142px rgba(0, 0, 0, 0.33), 0px 0px 142px #9747ff;
  &.dark {
    text-shadow: 0px 0px 142px rgba(255, 255, 255, 0.33), 0px 0px 142px #9747ff;
  }
  line-height: 100%;
  span {
    @apply text-purple-900 dark:text-purple-500;
  }
}
</style>
