<template>
  <section ref="heroSection" class="h-[1080px]">
    <span class="decoration unselectable">
      <p class="text-wrapper" v-for="lign in textDecoration">
        <span
          class="text-animation"
          :style="{
            '--typing-duration': Math.floor(Math.random() * 3000) + 2500 + 'ms',
            '--start-position': Math.floor(Math.random() * 65) + 30 + '%',
          }"
        >
          {{ lign }}
        </span>
      </p>
    </span>
  </section>
</template>

<script setup lang="ts">
interface ElementProps {
  offsetWidth: number;
  offsetHeight: number;
}

const heroSection: Ref<ElementProps | null> = ref(null);

const textDecoration = computed(() => {
  const HEIGHT = heroSection.value?.offsetHeight;
  const WIDTH = heroSection.value?.offsetWidth;
  let temp: string[] = [];

  if (HEIGHT && WIDTH) {
    const steps = HEIGHT / 86;
    for (let i = 0; i <= steps; i++) {
      const length = Math.floor(WIDTH / 52) - Math.floor(Math.random() * 10); //the length of the string we generate
      let str = "";
      for (let a = 0; a <= length; a++) {
        const random = Math.floor(Math.random() * 2);
        str += random;
      }
      temp[i] = str;
    }
  }

  return temp;
});
</script>

<style lang="scss">
/* The typing effect */
@keyframes typing {
  0% {
    width: var(--start-position);
  }
  50% {
    width: 100%;
  }
  75% {
    width: 100%;
  }
  100% {
    width: var(--start-position);
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #581c87;
  }
}

.unselectable {
  // Text non selectionable
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
.decoration {
  @apply text-[5rem] font-Inconsolata font-black text-green-900/25 dark:text-green-100/25
     absolute left-0 right-0 top-0 opacity-100 z-0;
  line-height: 100%;

  .text-wrapper {
    @apply text-[5rem] m-0;
  }

  .text-animation {
    letter-spacing: 0.05em; /* Adjust as needed */
    white-space: nowrap; /* Keeps the content on a single line */
    display: inline-block;
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    animation: typing var(--typing-duration) steps(80, end) infinite,
      blink-caret 0.75s step-end infinite;
  }
}
</style>
