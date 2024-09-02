<template>
  <div class="flex flex-col items-center justify-center mt-[10vh] text-center text-gray-600">
    <h2 class="text-2xl font-semibold mb-2">No results found</h2>
    <p class="text-gray-500 mb-4">Try another search, check the spelling or use a broader term</p>
    <Button variant="text" color="secondary" class="w-[350px]" @click="$emit('resetSearch')">Reset Search</Button>
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
