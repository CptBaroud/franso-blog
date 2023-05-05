<template>
  <div>
    <section class="hero">
      <div class="container">
        <h1 class="title" :class="{ dark: isDark }">
          Find <br /><span>my articles</span>
        </h1>
      </div>
      <BlobDecoration class="max-w-[1200px]" :small="6" :large="0" :medium="3">
        <div class="flex flex-row flex-wrap gap-8 max-w-[1200px]">
          <div class="max-w-[48%] z-10" v-for="item in data" :key="item.title">
            <BlogCard
              :title="item.title"
              :description="item.description"
              :tags="item.tags"
              :path="item._path"
            />
          </div>
        </div>
      </BlobDecoration>
    </section>
  </div>
</template>

<script setup lang="ts">
import BlogCard from "@/components/BlogCard.vue";
import BlobDecoration from "@/components/BlobDecoration.vue";

const isDark = useTheme();

const { data } = await useAsyncData("home", () =>
  queryContent("/blog").only(["tags", "title", "description", "_path"]).find()
);

const blobs = useBlob(24, 6);
</script>

<style lang="scss">
.bgDecoration {
  @apply absolute z-0;
}

.container {
  @apply flex flex-row relative gap-32 items-center justify-center max-w-[1200px] z-10;
}

.hero {
  @apply flex flex-col justify-center items-center gap-48 py-32 bg-light-full dark:bg-dark-full;

  .container {
    @apply justify-start;
  }
}

.title {
  @apply text-6xl uppercase font-black text-black dark:text-white;
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
