<template>
  <a :href="props.url" target="_blank" class="embed">
    <slot></slot>
  </a>
</template>

<script lang="ts" setup>
interface IEmbed {
  url: string;
}

const props = defineProps<IEmbed>();

// onMounted(async () => {
//   const rep = await fetch(props.url);
//   const data = await rep.json();
// });
</script>

<style lang="scss" scoped>
.embed {
  @apply inline-block px-4 py-2 w-full my-2 rounded-lg
    border-4 border-spacing-4 border-dashed border-dark/75 dark:border-white/75;

  &:hover {
    @apply text-purple-600 border-violet-600 -translate-y-1 transition-transform shadow cursor-pointer;
  }
}
</style>
