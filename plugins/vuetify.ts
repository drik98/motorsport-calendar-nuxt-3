import { createVuetify } from 'vuetify';
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		ssr: true,
	});
    theme: {
      defaultTheme: 'dark',
    },

	nuxtApp.vueApp.use(vuetify);
});