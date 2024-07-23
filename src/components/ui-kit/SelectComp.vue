<template>
  <main>
    <div class="card">
      <FloatLabel class="custom-float-label w-full md:w-56">
        <Select
          v-model="modelValue"
          inputId="dd-option"
          :options="options"
          optionLabel="name"
          class="custom-select"
        />
        <label for="dd-option">{{ placeholder }}</label>
      </FloatLabel>
    </div>
  </main>
</template>
<script setup lang="ts">
import { defineProps, watch } from 'vue'
import Select from 'primevue/select'
import FloatLabel from 'primevue/floatlabel'

export type Option = {
  name: string
  code: string
}

const modelValue = defineModel<Option | null>()

defineProps<{
  options: Option[]
  placeholder: string
}>()

watch(modelValue, (newValue) => {
  if (newValue?.code === '') {
    modelValue.value = null
  }
})
</script>

<style scoped>
.custom-select {
  @apply flex h-12 items-center rounded-none border-lightGrey bg-transparent active:border-primary;
}

.md\:w-56 {
  @apply w-auto;
}

.p-floatlabel label {
  @apply left-3.5 text-sm text-textSec;
}

.p-floatlabel:has(.p-inputwrapper-focus) label,
.p-floatlabel:has(.p-inputwrapper-filled) label {
  @apply top-[-0.15rem] bg-bgColor px-1 text-textSec;
}

.p-select:hover:not(.p-disabled).p-focus,
.p-select:not(.p-disabled).p-focus,
.p-select.p-focus ~ label {
  @apply border-primary text-primary;
}

.p-select:hover {
  @apply hover:border-textMain;
}

:deep(.custom-select .p-select-label) {
  @apply text-sm text-textMain;
}

:deep(.p-select.p-select-open .p-select-dropdown) {
  @apply rotate-180;
}
</style>
