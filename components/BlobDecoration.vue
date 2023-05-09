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
        '--delay': Math.floor(Math.random() * 3000) + 4500 + 'ms',
        '--translateX': Math.floor(Math.random() * 5) + '%',
        '--translateY': Math.floor(Math.random() * 10) + '%',
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
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }

  25% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  60% {
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }

  100% {
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }
}

@keyframes breathing {
  0% {
    -webkit-transform: scale(0.8);
    -ms-transform: scale(0.8);
    transform: scale(0.8);
  }

  25% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }

  60% {
    -webkit-transform: scale(0.8);
    -ms-transform: scale(0.8);
    transform: scale(0.8);
  }

  100% {
    -webkit-transform: scale(0.8);
    -ms-transform: scale(0.8);
    transform: scale(0.8);
  }
}

@keyframes moving {
  0% {
    transform: translateX(var(--translateX)) translateY(var(--translateY));
  }

  25% {
    transform: translateX(calc(-1 * var(--translateX)))
      translateY(calc(-1 * var(--translateY)));
  }

  35% {
    transform: translateX(var(--translateX)) translateY(var(--translateY));
  }

  65% {
    transform: translateX(calc(-1 * var(--translateX)))
      translateY(calc(-1 * var(--translateY)));
  }

  100% {
    transform: translateX(var(--translateX)) translateY(var(--translateY));
  }
}

.blob {
  @apply absolute z-10 opacity-95;
  -webkit-animation: breathing 5s ease-out infinite normal;
  animation: breathing 5s ease-out infinite normal,
    moving 20s ease-in-out infinite normal;
  animation-delay: var(--delay);
}
</style>
