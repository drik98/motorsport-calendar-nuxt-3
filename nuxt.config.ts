import vuetify from 'vite-plugin-vuetify'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  hooks: {
    'vite:extendConfig': (viteConfig) => {
      viteConfig.plugins?.push(
        vuetify({
          styles: { configFile: resolve('./settings.scss') },
          autoImport: true,
        })
      )
    },
  },
  app: {
    head: {
      title: 'Motorsport Calendar',
      htmlAttrs: {
        lang: 'de',
      },
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      noscript: [{ children: 'Javascript is required' }],
    },
  },
  modules: ['@nuxtjs/html-validator', '@nuxtjs/robots'],
  runtimeConfig: {
    googleApiKey: '',
    spreadsheetId: '',
    spreadsheetName: '',
    columnName: 'Rennen',
    columnHost: 'Übertragung',
    columnPlace: 'Ort',
    columnType: 'Art',
    columnDate: 'Datum',
    columnTime: 'Zeit',
    columnFormatDate: 'DD.MM.YYYY hh:mm',
    defaultRaceDuration: 'PT2H',
    public: {
      defaultFromDateDuration: 'P0D',
      defaultToDateDuration: 'P1W',
    },
  },
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
})
