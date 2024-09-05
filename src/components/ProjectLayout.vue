<template>
  <div class="mb-8 grid grid-cols-[260px_auto]">
    <section class="pr-6">
      <p class="title text-sm font-bold uppercase tracking-wide text-primary">
        {{ project.name }}
      </p>
      <p>{{ project.description }}</p>
    </section>
    <section class="border-l-2 border-l-primary pb-4 pl-6">
      <p class="title">Project roles</p>
      <p>{{ role }}</p>
      <p class="title">Period</p>
      <p>{{ project.start_date }} - {{ project.end_date }}</p>
      <p class="title">Responsibilities</p>
      <ul class="">
        <li
          class="ml-2 list-disc"
          v-for="(item, index) in project.responsibilities"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
      <p class="title">Environment</p>
      <p>{{ project.environment.join(', ') }}</p>
    </section>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  project: any
  role: string
}>()
</script>
<style scoped>
.title {
  @apply mb-2 mt-4 text-base font-bold leading-6;
}
</style>
