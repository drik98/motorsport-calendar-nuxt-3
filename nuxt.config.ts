// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Motorsport Calendar',
      htmlAttrs: {
        lang: 'de',
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      noscript: [{ children: 'Javascript is required' }],
    },
  },
  modules: [
    '@nuxtjs/html-validator',
    '@nuxtjs/robots'
  ],
  runtimeConfig: {
    googleApiKey: '',
    spreadsheetId: '',
    spreadsheetName: '',
  }
  vite: {
		ssr: {
			noExternal: ['vuetify'],
		},
		define: {
			'process.env.DEBUG': false,
		},
	},
})
