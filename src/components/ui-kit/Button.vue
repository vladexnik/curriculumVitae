<template>
  <button
    :class="buttonClass"
    class="transition duration-300 ease-in-out h-[36.5px] w-full text-sm font-medium uppercase focus:outline-none"
    :disabled="disabled"
  >
    <slot default="Button" />
  </button>
</template>
<script setup lang="ts">
import { computed } from 'vue'

export interface IButton {
  variant: 'contained' | 'outlined' | 'text'
  color: 'primary' | 'secondary'
  disabled?: boolean
}

const props = defineProps<IButton>()

const buttonClass = computed(() => {
  const variantClasses = {
    contained: 'text-white',
    outlined: 'border',
    text: ''
  }
  const colorClasses = {
    primary: {
      contained:
        'bg-primary hover:bg-primaryHover disabled:bg-secondaryLight disabled:text-secondary',
      outlined:
        'border-primary text-primary hover:bg-red-50 disabled:border-secondaryLight disabled:text-secondaryLight ',
      text: 'text-primary hover:bg-red-50 disabled:text-secondaryLight'
    },
    secondary: {
      contained:
        'bg-secondary hover:bg-secondaryHover disabled:bg-secondaryLight disabled:text-secondary',
      outlined:
        'border-secondary text-secondary hover:bg-secondaryLight disabled:border-secondaryLight disabled:text-secondaryLight',
      text: 'text-secondary hover:bg-secondaryLight disabled:text-secondaryLight'
    }
  }

  return [
    variantClasses[props.variant],
    colorClasses[props.color][props.variant]
  ].join(' ')
})
</script>
