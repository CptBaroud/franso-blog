<template>
  <footer class="flex w-full justify-center">
    <section class="footer-section">
      <h4 class="text-xl text-black dark:text-white font-bold my-0">
        All rights belong to
        <a
          href="https://twitter.com/Fransosiche"
          target="_blank"
          class="text-blue-500"
          >@Fransosiche</a
        >
      </h4>
      <h3 class="text-xl font-normal">Made with ♡ by Gurvan</h3>
    </section>
  </footer>
</template>

<style lang="scss">
.footer-section {
  @apply relative font-Inconsolata flex flex-col justify-center items-center py-16 max-w-[1200px] bg-light/75 dark:bg-dark/75 rounded-t-3xl;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-sizing: border-box;
}
</style>
