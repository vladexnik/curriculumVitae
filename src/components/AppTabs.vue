<template>
  <div class="mt-4 pl-5 text-textSec">
    <BreadcrumbsUser />
  </div>
</template>

<script setup lang="ts">
import BreadcrumbsUser from './BreadcrumbsUser.vue';
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
