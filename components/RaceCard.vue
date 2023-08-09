<template>
  <VCard class="elevation-2" :disabled="isRaceFinished">
    <VCardTitle class="headline">{{ name }}</VCardTitle>
    <VCardText class="renn-infos">
      <VRow v-show="series">
        <v-col md="3"> <VIcon>mdi-car-multiple</VIcon>Rennserie: </v-col>
        <v-col md="9">{{ series }}</v-col>
      </VRow>
      <VRow v-show="place">
        <v-col md="3">
          <VIcon>mdi-map-marker-radius</VIcon>Austragungsort:
        </v-col>
        <v-col md="9">{{ place }}</v-col>
      </VRow>
      <VRow v-show="hasTime(startDate)">
        <v-col md="3"> <VIcon>mdi-traffic-light</VIcon>Rennstart: </v-col>
        <v-col md="9">
          {{ formatTime(startDate) }}
        </v-col>
      </VRow>
      <VRow v-show="host">
        <v-col md="3">
          <VIcon>mdi-account-multiple</VIcon>Public viewing:
        </v-col>
        <v-col md="9">{{ host }}</v-col>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Race } from '~/types/races'

const props = defineProps<Race>()

const isRaceFinished = computed<boolean>(() => {
  return props.startDate.getTime() < Date.now()
})

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date)
}

function hasTime(date: Date): boolean {
  return date.getHours() !== 0 || date.getSeconds() !== 0
}
</script>
