<template>
  <main>
    <div class="field">
      <FloatLabel class="custom-float-label w-full md:w-56">
        <DatePicker v-model="modelValue" 
        class="custom-select" showIcon iconDisplay="input" 
        inputId="dd-option"/>
        <label for="dd-option">{{ placeholder }}</label>
      </FloatLabel>
    </div>
  </main>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import DatePicker from 'primevue/datepicker'
import FloatLabel from 'primevue/floatlabel'



const modelValue = defineModel<String | null>()

defineProps<{
  placeholder: string
}>()

</script>

<style scoped>
.custom-select {
  @apply flex h-[53px] items-center rounded-none border-lightGrey bg-transparent active:border-primary;
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

.p-datepicker:hover:not(.p-disabled).p-focus,
.p-datepicker:not(.p-disabled).p-focus,
.p-datepicker.p-focus ~ label {
  @apply border-primary text-primary;
}

.p-datepicker:hover {
  @apply hover:border-textMain;
}

:deep(.custom-select .p-datepicker-label),
:deep(.p-datepicker.p-disabled .p-datepicker-label) {
  @apply text-sm text-textMain;
}

:deep(.p-datepicker.p-datepicker-open .p-datepicker-dropdown) {
  @apply rotate-180;
}

.p-datepicker.p-disabled {
  @apply bg-transparent;
}

:deep(.p-datepicker) {
  @apply flex border border-lightGrey !bg-bgColor;
}
.p-datepicker-input, .p-inputtext, .p-datepicker-panel {
  @apply !border-none !bg-bgColor;
}

:deep(.p-datepicker-input, .p-inputtext) {
  border: none !important;
  background-color: transparent !important; 
  box-shadow: none !important;
}

:deep(.p-datepicker .p-inputtext:focus) {
  border-color: transparent !important;
  box-shadow: none !important;
}

:deep(.p-datepicker) {
  background-color: transparent !important; 
}

:deep(.p-inputwrapper-focus .p-inputtext) {
  box-shadow: none !important;
  border-color: transparent !important;
}
</style>
