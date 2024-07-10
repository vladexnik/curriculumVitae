<template>
  <div class="field">
    <div class="field__inner" :class="{ 'border-error': showError }">
      <input
        type="text"
        v-model="inputString"
        class="field__input"
        :required="required"
      />
      <label class="field__label" :class="{ 'label-error': showError }">
        <slot default="Name" />
      </label>
    </div>
  </div>
  <span v-if="showError" class="text-primary text-xs ml-2">Required field</span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineProps } from 'vue'

const props = defineProps<{
  required: boolean
}>()

const inputString = ref('')
const showError = ref(false)
</script>

<style scoped>
.border-error {
  border-color: rgb(198, 48, 49) !important;
}
.label-error {
  color: rgb(198, 48, 49) !important;
}
</style>
