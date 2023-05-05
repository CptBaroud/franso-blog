<template>
  <section>
    <div class="container bg">
      <NuxtLink
        to="/blog"
        class="text-xl font-black hover:text-black/75 hover:underline underline-offset-4"
        >{{ "<" }} Back</NuxtLink
      >
      <div class="flex flex-row gap-4">
        <div class="px-2 w-full">
          <ul v-for="link in summary" :key="link.title">
            <NuxtLink
              class="link"
              :to="link._path"
              :class="{
                exact: route.path === link._path,
              }"
            >
              {{ link.title }}
            </NuxtLink>
          </ul>
        </div>
        <div>
          <ContentDoc />
        </div>
        <div class="px-2 w-full">
          <Summary />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import useContent from "@/composables/useContent";
import { ArticleSummaryItem } from "@/interfaces/interfaces";

const { summaryArticles, findInsideLinks } = useContent();
const summary = ref<ArticleSummaryItem[]>([]);
const nav = ref([]);
const route = useRoute();

onMounted(async () => {
  summary.value = (await summaryArticles()) as [];
});
</script>

<style lang="scss" scoped>
.container {
  @apply max-w-[1200px] flex flex-col items-start gap-2;
}

.bg {
  @apply bg-light/50 dark:bg-dark/50 p-4 rounded-lg;
  backdrop-filter: blur(9px);
}

a,
.link {
  @apply px-1;
  &.exact {
    @apply font-bold border-l-2 border-purple-900 border-spacing-2 text-purple-900 dark:text-purple-500;
  }
}
</style>
