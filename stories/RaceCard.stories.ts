import type { Meta, StoryObj } from '@storybook/vue3'

import RaceCard from '../components/RaceCard.vue'
import mockedRaces from './races-fixtures'

const meta = {
  component: RaceCard,
  tags: ['autodocs'],
} satisfies Meta<typeof RaceCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ...mockedRaces[0],
  },
}
