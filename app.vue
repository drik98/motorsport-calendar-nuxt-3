<template>
  <v-app id="inspire">
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

<style lang="scss">
@use './settings';
</style>
