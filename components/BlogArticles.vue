<template>
  <section class="blog-section" :class="{ bg: isHomePage }">
    <h1 v-if="isHomePage" class="bg-title unselectable">
      {{ "<" }}BLOG{{ "/>" }}
    </h1>
    <div class="container">
      <TransitionGroup name="list" tag="ul" class="flex flex-wrap gap-8">
        <BlogCard
          v-for="article in articles"
          :key="article.title"
          :title="article.title"
          :description="article.description"
          :tags="article.tags"
          :path="article._path"
          disposition="landscape"
        />
      </TransitionGroup>
      <h2 v-if="articles.length === 0 && props.isHomePage" class="title">
        Come back later
      </h2>
      <NuxtLink v-if="isHomePage" to="/blog" class="button"
        >{{ "<See More />" }}</NuxtLink
      >
      <img
        class="absolute bottom-0 right-0 z-1"
        :src="
          useAsset(`images/blob-decoration-${$colorMode.preference}-1` + '.png')
        "
      />
      <img
        class="absolute top-0 left-0 z-1"
        :src="
          useAsset(`images/blob-decoration-${$colorMode.preference}-2` + '.png')
        "
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isHomePage: boolean;
}>();

import { ArticleChunk } from "~~/interfaces/interfaces";
import useContent from "@/composables/useContent";
const { listArticles } = useContent();

const articles = ref<ArticleChunk[]>([]);
onMounted(async () => {
  articles.value = await listArticles();

  if (props.isHomePage) {
    articles.value = articles.value.splice(0, 4);
  }
});
</script>

<style scoped lang="scss">
.container {
  @apply flex flex-row relative gap-32 items-center justify-around max-w-[1200px] z-10;
}

.blog-section {
  @apply relative flex flex-col justify-center items-center py-[11rem]
     z-10;
  &.bg {
    @apply bg-light-end dark:bg-dark-end;
  }
  .bg-title {
    @apply absolute top-0 left-0 max-w-full
      lg:text-[18rem] md:text-[9rem] text-[6rem] 
      text-purple-300/25 dark:text-purple-900/25 
      font-bold font-Inconsolata;
    line-height: 100%;
  }

  .title {
    @apply font-Inconsolata text-3xl;
  }

  .container {
    @apply flex-col gap-16 items-center;
  }
}
</style>
