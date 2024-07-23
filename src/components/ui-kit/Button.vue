<template>
  <button
    v-ripple
    :class="buttonClass"
    class="h-12 w-full rounded-[40px] text-sm font-medium uppercase transition duration-300 ease-in-out focus:outline-none"
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
        'bg-primary hover:bg-primaryDark active:bg-primaryDarkActive disabled:bg-disabledPrimary disabled:text-disabledPrimaryText disabled:border-disabledPrimaryText',
      outlined:
        'border-primary text-primary hover:bg-primaryLight active:bg-primaryLightActive disabled:bg-transparent disabled:text-disabledPrimaryText disabled:border-disabledPrimaryText',
      text: 'text-primary hover:bg-primaryLight active:bg-primaryLightActive disabled:bg-transparent disabled:text-disabledPrimaryText'
    },
    secondary: {
      contained:
        'bg-secondary hover:bg-secondaryDark active:bg-secondary disabled:bg-disabledPrimary disabled:text-disabledPrimaryText',
      outlined:
        'border-secondary text-secondary hover:bg-secondaryLight active:bg-secondaryLightActive disabled:bg-transparent disabled:border-disabledPrimaryText disabled:text-disabledPrimaryText',
      text: 'text-secondary hover:bg-secondaryLight active:bg-secondaryLightActive disabled:bg-transparent disabled:text-disabledPrimaryText'
    }
  }

  return [
    variantClasses[props.variant],
    colorClasses[props.color][props.variant]
  ].join(' ')
})
</script>
