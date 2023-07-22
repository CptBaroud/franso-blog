<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <section class="hero-section" ref="heroSection">
      <span class="decoration unselectable">
        <p
          class="text-wrapper"
          v-for="(lign, i) in textDecoration"
          :key="`lign-${i}`"
        >
          <span
            class="text-animation"
            :style="{
              '--typing-duration':
                Math.floor(Math.random() * 3000) + 2500 + 'ms',
              '--start-position': Math.floor(Math.random() * 50) + 20 + '%',
            }"
          >
            {{ lign }}
          </span>
        </p>
      </span>
      <div class="container">
        <div class="hero-wrapper">
          <div class="title-wrapper">
            <h1 class="title" :class="{ dark: isDark }">
              {{ "<" }}Hi,I'm <br />
              <span class="text-purple-900 dark:text-purple-300">Franso</span
              >{{ "/>" }}
            </h1>
          </div>
          <p class="lg:text-2xl text-xl text-gray-900 dark:text-white">
            Cybersecurity engineer and pentester enthusiast
          </p>
        </div>
        <img :src="heroImgUrl" class="hero-art" />
      </div>
    </section>

    <BlogArticles :is-home-page="true" />
  </div>
</template>

<script setup lang="ts">
import { ElementProps } from "~~/interfaces/interfaces";

const heroSection: Ref<ElementProps | null> = ref(null);

const isDark = useTheme();
const colorMode = useColorMode();

const heroImgUrl = new URL(
  `../assets/images/hero-artwork-${colorMode.preference}.png`,
  import.meta.url
).href;

const textDecoration = computed(() => {
  const HEIGHT = heroSection.value?.offsetHeight;
  const WIDTH = heroSection.value?.offsetWidth;
  let temp: string[] = [];

  if (HEIGHT && WIDTH) {
    const steps = HEIGHT / 96;
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

<style lang="scss" scoped>
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

.container {
  @apply flex 
    md:flex-row relative lg:gap-32 
    flex-col-reverse gap-8
    items-center justify-around max-w-[1200px] z-10;
}

.unselectable {
  // Text non selectionable
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.hero-section {
  @apply flex flex-col relative justify-center py-16 pt-48
    bg-light-start dark:bg-dark-start z-20;

  .hero-wrapper {
    @apply flex font-Inconsolata flex-col gap-4;

    .title {
      @apply bg-transparent relative
         dark:text-white text-gray-900
         lg:text-[5.375rem] text-[3.75rem] 
         font-extrabold font-Inconsolata uppercase;
      line-height: 100%;
      //letter-spacing: 0%;
      text-shadow: 0px 0px 142px rgba(0, 0, 0, 0.33), 0px 0px 142px #9747ff;
      &.dark {
        text-shadow: 0px 0px 142px rgba(255, 255, 255, 0.33),
          0px 0px 142px #9747ff;
      }
    }

    .title-wrapper {
      @apply relative;
    }
  }

  .decoration {
    @apply text-[5rem] font-Inconsolata 
      font-black text-black/25 dark:text-white/25
      absolute left-0 right-0 top-0 opacity-[10%] dark:opacity-5 z-0 overflow-hidden;
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

  .hero-art {
    @apply z-10 md:max-w-[55%] max-w-full;
  }
}
</style>
