import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createVuetify } from 'vuetify/lib/framework.mjs'

/**
 * Normally we should not have to configure vuetify again as it should be extraced from the normal (nuxt)
 * config but because we are using nuxt instead of a pure vite setup for storybook, we have to manually add
 * the vuetify plugin here and in `main.ts` as well as adding the styles.
 *
 * Mostly adapted from https://storybook.js.org/recipes/vuetify
 */

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { withVuetifyTheme } from './withVuetifyTheme.decorator'

setup((app) => {
  // Registers your app's plugins into Storybook
  app.use(createVuetify())
})

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global Vuetify themes for components',
      defaultValue: 'dark',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', left: '🌞' },
          { value: 'dark', title: 'Dark', left: '🌛' },
        ],
        dynamicTitle: true,
        showName: true,
      },
    },
  },
  decorators: [withVuetifyTheme],
}

export default preview
