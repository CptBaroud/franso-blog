<template>
  <NuxtLink
    class="blogCard"
    :class="[disposition, $colorMode.preference]"
    :to="path"
  >
    <div class="blogCard-content">
      <span>
        <h2 class="blogCard-title">
          {{ title }}
        </h2>
        <p class="blogCard-description">{{ description }}</p>
      </span>
      <ul class="inline-flex gap-2">
        <Label
          v-for="(tags, i) in props.tags"
          :key="`tags-${i}}`"
          :text="tags"
        />
      </ul>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import Label from "~/components/atoms/Label.vue";

interface IBlogCard {
  path: string;
  title: string;
  cover?: string;
  description: string;
  tags?: Array<string>;
  disposition: "portrait" | "landscape";
}

const props = defineProps<IBlogCard>();
</script>

<style lang="postcss">
.blogCard {
  @apply flex gap-4 relative w-full max-w-full lg:max-w-[48%] justify-between rounded-2xl shadow-md p-4 z-20
    bg-light/75 dark:bg-dark/75 font-Inter border border-light/95 dark:border-dark/95;

  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  &::before {
    @apply w-[128px] h-[64px] bg-red-500 rotate-12;
  }

  &:hover {
    @apply -translate-y-1 cursor-pointer;
    transition: all 0.25s ease-in-out;
  }

  &.landscape {
    @apply flex-row;
  }

  &.portrait {
    @apply flex-col;
  }
}

.blogCard-title {
  @apply text-2xl xl:text-4xl font-bold text-gray-900 dark:text-white pt-0 truncate;
  line-height: 150%;
}

.blogCard-content {
  @apply flex w-full flex-col justify-between gap-2;
}

.blogCard-description {
  @apply text-base text-gray-900/75 dark:text-white/75 pb-0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
