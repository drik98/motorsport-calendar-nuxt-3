<template>
  <v-app id="inspire" :theme="vuetifyTheme">
    <v-app-bar app clipped-left>
      <v-toolbar-title>Motorsport Kalender</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <NuxtPage />
      </v-container>
    </v-main>

    <v-footer app class="justify-space-between">
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <span>Hendrik Schmitz</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
const vuetifyTheme = ref('dark')

// window object is not accesible during server side rendering
if (process.client) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  setTheme(mq.matches)

  mq.addEventListener('change', (e) => setTheme(e.matches))
}

async function setTheme(isDark: boolean): Promise<void> {
  await nextTick()
  vuetifyTheme.value = isDark ? 'dark' : 'light'
}
</script>

<style lang="scss">
@use './settings';
</style>
