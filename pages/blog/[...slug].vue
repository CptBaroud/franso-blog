<template>
  <section class="bg-light-full dark:bg-dark-full">
    <div class="w-full flex 2xl:hidden">
      <NuxtLink
        to="/blog"
        class="text-xl font-black hover:text-black/75 hover:dark:text-white/75 hover:underline underline-offset-4 pb-4"
        >{{ "<" }} Back</NuxtLink
      >
    </div>
    <div class="container">
      <div class="nav-left hidden 2xl:flex px-2 h-full">
        <div class="mt-8">
          <div class="flex w-48 flex-col">
            <NuxtLink
              to="/blog"
              class="text-xl font-black hover:text-black/75 hover:underline underline-offset-4 pb-4"
              >{{ "<" }} Back</NuxtLink
            >
            <li class="list-none" v-for="link in summary" :key="link.title">
              <NuxtLink
                class="link"
                :to="link._path"
                :class="{
                  exact: route.path === link._path,
                }"
              >
                {{ link.title }}
              </NuxtLink>
            </li>
          </div>
        </div>
      </div>
      <ContentDoc class="content" />
      <div class="nav-right hidden lg:flex flex-col px-2 h-full">
        <div class="fixed mt-8">
          <div class="flex w-48 flex-col">
            <ul class="nav">
              <li class="list-none" v-for="link in nav" :key="link.id">
                <a
                  class="nav-link"
                  :class="{
                    selected: actual == link.id,
                  }"
                  :href="`#${link.id}`"
                >
                  {{ link.text }}</a
                >
                <span v-if="link.linkedLinks.length !== 0">
                  <ul class="sub-nav">
                    <li
                      class="list-none"
                      v-for="subLink in link.linkedLinks"
                      :key="subLink.id"
                    >
                      <a
                        class="nav-link"
                        :class="{ selected: actual === subLink.id }"
                        :href="`#${subLink.id}`"
                        >{{ subLink.text }}</a
                      >
                    </li>
                  </ul>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import useContent from "@/composables/useContent";
import { ArticleSummaryItem, navLinks } from "@/interfaces/interfaces";

const { summaryArticles, findInsideLinks } = useContent();
const summary = ref<ArticleSummaryItem[]>([]);
const nav = ref<navLinks[]>([]);
const route = useRoute();

let actual = route.hash.replace("#", "");

watch(route, (item) => {
  actual = item.hash.replace("#", "");
});

onMounted(async () => {
  summary.value = await summaryArticles();
  nav.value = await findInsideLinks(route.path);
});
</script>

<style lang="scss" scoped>
section {
  @apply flex-col items-start 2xl:items-center gap-4;
}

.show-mobile {
  @media (min-width: 1536px) {
    display: none;
  }
}
.container {
  @apply max-w-[1200px] flex flex-col 2xl:flex-row items-start justify-center gap-8;
}

.bg {
  @apply bg-light/50 dark:bg-dark/50 rounded-lg;
  backdrop-filter: blur(9px);
}

a,
.link {
  @apply px-1;
  &.exact {
    @apply font-bold border-l-2 border-purple-900 border-spacing-2 text-purple-900 dark:text-purple-500;
  }
}

.nav {
  @apply text-base my-0;

  .nav-link {
    @apply list-none my-0 overflow-ellipsis;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
    &:hover,
    &.selected {
      @apply font-bold border-l-2 border-purple-900 border-spacing-2 text-purple-900 dark:text-purple-500;
    }
  }

  .sub-nav {
    @apply pl-4 my-1;
  }
}

.nav-left {
  flex: 1 1 25%;
}

.nav-right {
  flex: 1 1 25%;
}

.content {
  flex: 2 2 100%;
}
</style>
