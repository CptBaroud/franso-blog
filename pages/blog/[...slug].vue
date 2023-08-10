<template>
  <section>
    <div class="container bg">
      <div class="w-full">
        <NuxtLink
          :to="localePath('/blog')"
          class="text-xl hover:text-black/75 hover:dark:text-white/75 hover:underline underline-offset-4 pb-4"
          >{{ "<" }} Back</NuxtLink
        >
      </div>
      <ContentDoc class="content w-full" />
    </div>
    <div class="md:block hidden bg px-2 py-8 sticky top-8">
      <div class="flex w-48 flex-col">
        <ul class="nav">
          <li class="list-none" v-for="link in nav" :key="link.id">
            <a class="nav-link" :href="`#${link.id}`"> {{ link.text }}</a>
            <span v-if="link.linkedLinks.length !== 0">
              <ul class="sub-nav">
                <li
                  class="list-none"
                  v-for="subLink in link.linkedLinks"
                  :key="subLink.id"
                >
                  <a class="nav-link" :href="`#${subLink.id}`">{{
                    subLink.text
                  }}</a>
                </li>
              </ul>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import useContent from "@/composables/useContent";
import { navLinks, ArticleTranslations } from "@/interfaces/interfaces";

const { findInsideLinks, translations } = useContent();
const localePath = useLocalePath();
const route = useRoute();

const nav = ref<navLinks[]>([]);
const translatedPath = ref<ArticleTranslations>({ fr: "", en: "" });

definePageMeta({
  nuxtI18n: {
    en: { slug: [""] },
    fr: { slug: [""] },
  },
});

onMounted(async () => {
  nav.value = await findInsideLinks(route.path);
  translatedPath.value = await translations(route.path);
  route.meta.nuxtI18n = {
    en: { slug: [translatedPath.value.en] },
    fr: { slug: [translatedPath.value.fr] },
  };
});
</script>

<style lang="scss" scoped>
section {
  @apply flex-row items-start gap-4 pt-2 md:pt-8 xl:pt-16;
}

.show-mobile {
  @media (min-width: 1536px) {
    display: none;
  }
}
.container {
  @apply max-w-[1000px] pt-0 flex-col items-start gap-4 w-full p-0 md:p-8;
}

.bg {
  @apply bg-light/75 dark:bg-dark/75 rounded-2xl;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-sizing: border-box;
}

.nav {
  @apply text-base my-0;

  .nav-link {
    @apply list-none my-0 overflow-ellipsis line-clamp-1;
    &:hover,
    &.selected {
      @apply font-bold px-2 border-l-2 border-purple-900 border-spacing-2 text-purple-900 dark:text-purple-500;
      transition: all 0.2s;
    }
  }

  .sub-nav {
    @apply pl-2 my-1;
  }
}

.content {
  @apply w-full;
  flex: 2 2 100%;
}
</style>
