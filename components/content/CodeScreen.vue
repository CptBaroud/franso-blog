<template>
  <div class="px-4 my-8">
    <div>
      <h4 class="text-dark/70 dark:text-white/70">{{ props.title }}</h4>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface ICode {
  title: string;
}

const props = defineProps<ICode>();
</script>

<style lang="scss" scoped>
code {
  @apply bg-red-600;
}
pre {
  @apply bg-red-400;
  code {
    @apply bg-red-500;
  }
}
</style>
