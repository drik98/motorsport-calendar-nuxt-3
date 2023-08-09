<template>
  <VAlert v-if="!races.length" type="warning"
    >Keine Rennen im ausgewählten Zeitraum vorhanden.
  </VAlert>
  <VTimeline v-else>
    <VTimelineItem
      v-for="race in races"
      :key="race.id"
      :icon="'mdi-flag-checkered'"
      :color="isRaceFinished(race) ? 'grey' : 'deep-orange'"
    >
      <template #opposite>{{ formatDate(race.startDate) }}</template>
      <RaceCard v-bind="race" />
    </VTimelineItem>
  </VTimeline>
</template>

<script setup lang="ts">
import { Race } from '~/types/races'
import RaceCard from './RaceCard.vue'

defineProps<{
  /**
   * The already filtered races that should be displayed in the timeline chronologically
   */
  races: Race[]
}>()

function isRaceFinished(race: Race): boolean {
  return race.endDate.getTime() < Date.now()
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {}).format(date)
}
</script>
