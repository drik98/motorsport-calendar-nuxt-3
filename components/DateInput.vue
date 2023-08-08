<template>
  <VDialog v-model="isDialogOpened" persistent width="290px">
    <template #activator="{ props: activatorProps }">
      <VTextField
        v-model="formattedDate"
        prepend-icon="mdi-calendar"
        readonly
        :label="label"
        v-bind="activatorProps"
      ></VTextField>
    </template>
    <VDatePicker
      v-model="datePickerModelValue"
      scrollable
      @click:cancel="closeDialog"
      @click:save="updateValue"
    />
  </VDialog>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
// As long as the datepicker is a labs module, we have to import it seperately
import { VDatePicker } from 'vuetify/labs/VDatePicker'

const props = defineProps<{
  /**
   * Can be used to externally control the state of the component
   */
  modelValue?: Date
  /**
   * An optional label that will be added to the input field
   */
  label?: string
}>()

const emit = defineEmits<{
  /**
   * Will be triggered when another date was selected and confirmed through the confirm button
   */
  (e: 'update:modelValue', value: Date): void
}>()

const dateModelValue = ref(props.modelValue)
const datePickerModelValue = ref(dateModelValue.value)
const isDialogOpened = ref(false)

watchEffect(async () => {
  dateModelValue.value = props.modelValue
})

watchEffect(async () => {
  datePickerModelValue.value = dateModelValue.value
})

const formattedDate = computed<string>(() => {
  if (!dateModelValue.value) {
    return ''
  }
  return new Intl.DateTimeFormat(undefined, {}).format(dateModelValue.value)
})

function closeDialog(): void {
  isDialogOpened.value = false
}

function updateValue(): void {
  if (
    datePickerModelValue.value &&
    dateModelValue.value?.getTime() !== datePickerModelValue.value.getTime()
  ) {
    dateModelValue.value = datePickerModelValue.value
    emit('update:modelValue', dateModelValue.value)
  }
  closeDialog()
}
</script>
