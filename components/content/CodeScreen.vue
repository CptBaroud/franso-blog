<template>
  <div class="px-4 my-8">
    <div>
      <h4 class="text-2xl text-dark/70 dark:text-white/70 my-4">
        {{ props.title }}
      </h4>
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

<style lang="scss">
pre {
  code {
    @apply inline-block w-full p-2 my-2;
  }
}
</style>
