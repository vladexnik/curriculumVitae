<template>
  <div class="cv-preview__cv-description">
    <section class="pr-6">
      <p class="cv-preview__project-name">
        {{ project.name }}
      </p>
      <p>{{ project.description }}</p>
    </section>
    <section class="cv-preview__cv-description__right-side">
      <p class="title">Project roles</p>
      <p>{{ role }}</p>
      <p class="title">Period</p>
      <p>{{ project.start_date }} - {{ project.end_date }}</p>
      <p class="title">Responsibilities</p>
      <ul>
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
import type { CVProjectBase } from '@/models/models'

defineProps<{
  project: CVProjectBase
  role: string
}>()
</script>
<style scoped>
.cv-preview__project-name {
  @apply mb-2 mt-4 text-sm font-bold uppercase text-primary;
}

.cv-preview__cv-description {
  @apply mb-8 grid grid-flow-col grid-cols-[260px_auto];
}

.cv-preview__cv-description__right-side {
  @apply border-l-2 border-l-primary pb-4 pl-6;
}
.title {
  @apply mb-2 mt-4 text-base font-bold leading-6;
}
</style>
