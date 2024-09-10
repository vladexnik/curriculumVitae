<template>
  <div class="flex flex-col items-center justify-center mt-[10vh] text-center text-gray-600">
    <slot>
      <h2 class="text-2xl font-semibold mb-2">{{ $t('noResultsTitle') }}</h2>
      <p class="text-gray-500 mb-4">{{ $t('noResultsDescription') }}</p>
    </slot>
    <Button variant="text" color="secondary" class="w-[350px]" @click="$emit('resetSearch')">
      {{ $t('resetSearch') }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';
</script>

<style scoped>
div {
  @apply bg-bgColor text-textSec;
}
</style>
