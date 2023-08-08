import { h, watch, ref } from 'vue'
import StoryWrapper from './StoryWrapper.vue'

export const DEFAULT_THEME = 'dark'
const theme = ref(DEFAULT_THEME)

export const withVuetifyTheme = (storyFn, context) => {
  const story = storyFn()

  /**
   * This workaround is taken from https://github.com/storybookjs/storybook/issues/12840#issuecomment-1598808427
   * and necessary because otherwise the theme only gets updated when the page is reloaded
   */
  watch(
    () => context.globals.theme,
    (newTheme) => (theme.value = newTheme ?? DEFAULT_THEME),
    { immediate: true }
  )

  return () => {
    return h(
      StoryWrapper,
      // give themeName to StoryWrapper as a prop
      { themeName: theme.value },
      {
        story: () => h(story, { ...context.args }),
      }
    )
  }
}
