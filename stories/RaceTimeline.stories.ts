import type { Meta, StoryObj } from '@storybook/vue3'

import RaceTimeLine from '../components/RaceTimeline.vue'
import mockedRaces from './races-fixtures'

const meta = {
  component: RaceTimeLine,
  tags: ['autodocs'],
} satisfies Meta<typeof RaceTimeLine>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    races: mockedRaces,
  },
}

export const NoRacesPresent: Story = {
  args: {
    ...Default.args,
    races: [],
  },
}
