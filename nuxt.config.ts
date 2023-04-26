import svgLoader from 'vite-svg-loader'
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt',  "@nuxtjs/color-mode", '@nuxt/content'],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-import': {},
        'tailwindcss/nesting': 'postcss-nesting'
      },
    },
    head() {
      return {
        meta: [
          { rel: "preconnect", href: "https://fonts.googleapis.com" },
          {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
          },
        ]
      }
    },
    css: ['~/assets/css/tailwind.scss'],
    tailwindcss: {
        // add '~tailwind.config` alias
        exposeConfig: true
    },
    vite: {
      plugins: [
        svgLoader({})
      ]
    },
    colorMode: {
      preference: 'light', // default value of $colorMode.preference
      fallback: 'light', // fallback value if not system preference found
      classSuffix: '',
    }
})
