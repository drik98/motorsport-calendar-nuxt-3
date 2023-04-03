<template>
  <div class="hello-scss p-2">
    <div class="hello-scss__element text-2xl">Hello World, {{ value }}!</div>
    <ul class="list-disc">
      <li v-for="race in data" :key="race.name" class="my-2">
        <strong>{{ race.name }}</strong>
        <ul class="list-disc list-inside">
          <li v-for="[ key, entry] in Object.entries( race )" :key="key">
            {{ key }}: {{ entry }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import { Race } from '~/server/api/google-sheets'

const { data } = useFetch<Race[]>('/api/google-sheets')

// Typescript ESLint check;
type Value = string
const value: Ref<Value> = ref('Hello Nuxt3')
</script>

<style lang="scss" scoped>
.hello-scss {
  &__element {
    @apply hover:text-green-400;
    @apply hover:cursor-pointer;
  }
}
</style>
