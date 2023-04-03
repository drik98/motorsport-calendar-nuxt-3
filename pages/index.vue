<template>
  <div class="hello-scss">
    <div class="hello-scss__element">Hello World, {{ value }}!</div>
    <ul class="list-disc">
      <li v-for="race in data" :key="race.name">
        <strong>{{ race.name }}</strong>
        <ul>
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
</style>
