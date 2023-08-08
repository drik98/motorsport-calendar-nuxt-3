<template>
  <VApp :theme="themeName">
    <VMain>
      <slot name="story"></slot>
    </VMain>
  </VApp>
</template>

<script lang="ts" setup>
const props = defineProps<{
  themeName?: string
}>()
</script>

<style lang="scss" scoped>
.v-main {
  padding: 2em;
}
</style>
