<template>
  <div :class="[type, size]" class="label">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "large",
  },
});
</script>

<style lang="scss">
.label {
  @apply inline-block rounded-full
    font-bold;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  &.small {
    @apply text-sm py-1 px-3;
  }

  &.large {
    @apply text-base py-1.5 px-4;
  }
}
</style>
