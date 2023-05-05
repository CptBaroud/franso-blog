<template>
  <div class="relative">
    <img
      v-for="(item, i) in blobs"
      :key="i"
      :src="useAsset(`blob/` + item.src)"
      :width="item.width"
      :height="item.height"
      class="blob absolute z-10 opacity-10"
      :style="{
        top: item.position.top,
        bottom: item.position.bottom,
        left: item.position.left,
        right: item.position.right,
        '--delay': Math.floor(Math.random() * 3000) + 2500 + 'ms',
      }"
    />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  small: number;
  large: number;
  medium?: number;
}>();

const blobs = useBlob(props.small, props.large, props.medium);
</script>

<style lang="scss">
@-webkit-keyframes breathing {
  0% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }

  25% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  60% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }

  100% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
}

@keyframes breathing {
  0% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }

  25% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }

  60% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }

  100% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }
}

.blob {
  @apply absolute z-10 opacity-95;
  -webkit-animation: breathing 5s ease-out infinite normal;
  animation: breathing 5s ease-out infinite normal;
  animation-delay: var(--delay);
}
</style>
