<template>
  <li
    :class="{
      active: isActive
    }"
    ref="menuItemRoot"
    class="flex h-14 cursor-pointer items-center gap-4 rounded-br-3xl rounded-tr-3xl p-3 px-4 py-[9px] text-textSec hover:bg-optionHover"
    @click="$emit('click')"
  >
    <div class="flex justify-center">
      <i :class="icon" style="font-size: 1.5rem" class="flex items-center">
        <slot name="avatar"></slot>
      </i>
    </div>
    <transition name="fade">
      <span v-if="!isCollapsed">{{ label }}</span>
    </transition>
  </li>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'

const menuItemRoot = ref<HTMLElement | null>(null)
const emit = defineEmits(['click'])

defineProps({
  label: String,
  icon: String,
  isCollapsed: Boolean,
  isActive: Boolean
})

defineExpose({
  menuItemRoot
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}

.active {
  @apply bg-optionHover text-textMain;
}
</style>
