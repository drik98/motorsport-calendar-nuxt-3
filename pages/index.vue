<template>
  <VContainer>
    <VRow justify="center">
      <VCol>
        <DateInput
          :model-value="filterDateFrom"
          label="Von"
          @update:model-value="updateDateFrom"
        />
      </VCol>
      <VCol>
        <DateInput
          :model-value="filterDateTo"
          label="Bis"
          @update:model-value="updateDateTo"
        />
      </VCol>
    </VRow>
  </VContainer>
  <VContainer>
    <RaceTimeline :races="filteredRaces"/>
  </VContainer>
</template>

<script setup lang="ts">
import moment from 'moment'
import { Race } from '~/types/races'
import RaceTimeline from '~/components/RaceTimeline.vue'

const runtimeConfig = useRuntimeConfig()

const { data: races } = useFetch<Race[]>('/api/google-sheets', {
  transform(races: Race[]) {
    return races.map((race) => {
      race.startDate = new Date(race.startDate)
      race.endDate = new Date(race.endDate)
      return race
    })
  },
})

const { value: filterDateFrom, update: updateDateFrom } = useSelectDate(
  moment(new Date())
    .add(moment.duration(runtimeConfig.public.defaultFromDateDuration))
    .toDate()
)
const { value: filterDateTo, update: updateDateTo } = useSelectDate(
  moment(new Date())
    .add(moment.duration(runtimeConfig.public.defaultToDateDuration))
    .toDate(),
  DateType.END_OF_DAY
)

const filteredRaces = computed<Race[]>(() => {
  return (
    races.value?.filter((race) => {
      return (
        (race.startDate >= filterDateFrom.value &&
          race.startDate <= filterDateTo.value) ||
        (race.endDate >= filterDateFrom.value &&
          race.endDate <= filterDateTo.value)
      )
    }) ?? []
  )
})
</script>

<style lang="scss" scoped></style>
