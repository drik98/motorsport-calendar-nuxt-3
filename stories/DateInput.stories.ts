import type { Meta, StoryObj } from '@storybook/vue3'

import DateInput from '../components/DateInput.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  component: DateInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof DateInput>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    label: 'Birthday',
    modelValue: new Date(),
  },
}

export const WithoutPresetValue: Story = {
  args: {
    ...Default.args,
    modelValue: undefined,
  },
}

export const WithoutLabel: Story = {
  args: {
    ...Default.args,
    label: undefined,
  },
}
