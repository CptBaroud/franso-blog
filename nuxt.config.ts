import svgLoader from 'vite-svg-loader'
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/color-mode', '@nuxt/content', '@nuxtjs/i18n'],
  i18n: {
    langDir: 'locales/',
    strategy: 'prefix_and_default',
    locales: [
        {
            code: 'fr',
            iso: 'fr-FR',
            file: 'fr.json'
        },
        {
            code: 'en',
            iso: 'en-EN',
            file: 'en.json'
        }
    ],
    defaultLocale: 'fr',
    detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root',  // recommended
      }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      'postcss-import': {},
      'tailwindcss/nesting': 'postcss-nesting'
    },
  },
  app: {
    head: {
      title: 'Franso Blog',
      titleTemplate: "%s | Franso",
      link: [
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
