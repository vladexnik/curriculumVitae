<template>
  <div class="field">
    <div :class="['field__inner', { 'border-error': error }]">
      <input
        :type="isPasswordField && !showPassword ? 'password' : 'text'"
        ref="input"
        v-model="modelInput"
        class="field__input"
        :required="required"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <label
        class="field__label"
        :class="{
          'label-top': isFocused || modelInput,
          'label-error': error
        }"
      >
        <slot default="Name" />
      </label>
      <button
        class="field__button mr-2 flex items-center focus:outline-none"
        v-if="isPasswordField"
        type="button"
        @click="togglePasswordVisibility"
      >
        <i
          v-ripple
          class="cursor-pointer rounded-2xl p-2 text-textMain duration-300 hover:bg-optionHover"
          :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
          style="font-size: 1.2rem"
        ></i>
      </button>
    </div>
    <span v-if="error" class="ml-3 text-xs text-primary">{{ error }}</span>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { defineProps } from 'vue'

const isFocused = ref(false)
const showPassword = ref(false)
const isPasswordField = computed(() => props.type === 'password')
const props = defineProps<{
  required?: boolean
  type: String
  error?: String | Ref<string>
}>()
const modelInput = defineModel({ type: String })

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const input = ref<HTMLInputElement | null>(null)

defineExpose({
  focus: () => {
    input.value?.focus()
  }
})
</script>
<style scoped>
.field {
  @apply relative h-full w-full;
}

.field__inner {
  @apply flex border border-lightGrey;
}

.field__inner:hover {
  @apply border-textMain;
}

.field__inner:focus-within {
  @apply border-primary;
}

.field__inner .field__input {
  @apply w-full bg-transparent px-3.5 py-4 text-sm text-textMain outline-none transition-all duration-300 ease-in-out;
}

.field__label {
  @apply pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-textSec transition-all duration-300 ease-in-out;
}

.field__input:focus ~ .field__label,
.field__input:not(:empty) ~ .field__label {
  @apply top-0 -translate-y-1/2 bg-bgColor px-1 text-xs text-primary;
}

.field__label.label-top,
.field__label.label-error {
  @apply top-0 -translate-y-1/2 bg-bgColor px-1 text-xs text-textSec;
}

.field__label.label-error {
  @apply text-primary;
}

.border-error {
  @apply border-primary hover:border-primary;
}

.field__button:focus i {
  @apply bg-secondaryLight;
}
.field__button:active i {
  @apply bg-secondaryLightActive;
}
</style>
