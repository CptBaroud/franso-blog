<template>
  <div class="alert" :class="props.type">
    <div>
      <component :is="icons[iconName]" class="icon" />
    </div>
    <div>
      <ContentSlot :use="$slots.default" unwrap="div" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import iconinfo from "~/assets/icons/icon-search.svg?component";
import iconerror from "~/assets/icons/icon-close.svg?component";
import iconwarning from "~/assets/icons/icon-exclamation.svg?component";
import iconsuccess from "~/assets/icons/icon-check.svg?component";

interface IHint {
  type: string;
}

const props = defineProps<IHint>();
const icons = computed(() => {
  return {
    iconinfo,
    iconerror,
    iconwarning,
    iconsuccess,
  };
});
const iconName = computed(() => {
  return "icon" + props.type;
});
</script>

<style lang="scss" scoped>
.alert {
  @apply flex flex-row items-start gap-4 px-2 py-2 rounded-md my-8 h-full border-l-8 shadow;
  backdrop-filter: blur(9px);

  &.info {
    @apply border-blue-600 bg-blue-50/50 dark:bg-blue-900/20;
  }

  &.warning {
    @apply border-orange-600 bg-orange-50/50 dark:bg-orange-900/20;
  }
}

.icon {
  @apply w-8 pt-2 h-full;
}
</style>
