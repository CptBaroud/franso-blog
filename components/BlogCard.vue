<template>
  <NuxtLink
    class="blogCard"
    :class="[disposition, $colorMode.preference]"
    :to="path"
  >
    <img
      v-if="props.cover"
      class="blogCard-cover"
      :class="disposition"
      :src="props.cover || useAsset('images/blog-cover-default.png')"
    />
    <div class="blogCard-content">
      <h2 class="blogCard-title">
        {{ title }}
      </h2>
      <p class="blogCard-description">{{ description }}</p>
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

<style scoped lang="scss">
.blogCard {
  @apply flex gap-4 rounded-2xl shadow-md p-4 z-10
    bg-light/50 dark:bg-dark/50 backdrop-blur font-Inconsolata;
  backdrop-filter: blur(9px);
  flex: 0 0 46%;
  @media (max-width: 768px) {
    flex: 0 0 100%;
  }
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

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
  @apply text-2xl xl:text-4xl font-bold text-gray-900 dark:text-white;
  line-height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.blogCard-cover {
  @apply rounded-2xl h-auto;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  object-fit: cover;
  &.landscape {
    flex-basis: 45%;
    max-width: 45%;
    max-height: 231px;
  }

  &.portrait {
    flex-basis: 100%;
    max-width: 100%;
    max-height: 55%;
  }
}
.blogCard-content {
  @apply flex flex-col gap-2;
}

.blogCard-description {
  @apply text-base text-gray-900/75 dark:text-white/75;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
