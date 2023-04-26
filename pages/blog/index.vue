<template>
  <div>
    <section class="hero">
      <div class="container">
        <h1 class="title" :class="{ dark: isDark }">
          Find <br /><span>my articles</span>
        </h1>
      </div>
    </section>
    <section class="articles">
      <div class="container">
        <div v-for="item in data">
          <BlogCard
            :title="item.title"
            :description="item.description"
            :tags="item.tags"
            :path="item._path"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import BlogCard from "@/components/BlogCard.vue";

const isDark = useTheme();

const { data } = await useAsyncData("home", () =>
  queryContent("/blog").only(["tags", "title", "description", "_path"]).find()
);

console.log(data);
</script>

<style lang="scss">
.container {
  @apply flex flex-row relative gap-32 items-center justify-center max-w-[1200px] z-10;
}

.hero {
  @apply flex flex-row justify-center items-center pb-64 pt-24;

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

.articles {
  @apply relative;

  &::before {
    content: "";
  }
}
</style>
