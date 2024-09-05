<template>
  <div v-if="groupedSkills" class="skills-container">
    <div v-for="(skills, categoryName) in groupedSkills" :key="categoryName">
      <h3 class="title">{{ categoryName }}</h3>
      <ul class="list-none p-0">
        <span>
          {{ skills.map((skill) => skill.name).join(', ') }}
        </span>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SkillCategory, SkillMastery } from '@/models/models'
import { computed } from 'vue'

const props = defineProps<{
  skills: SkillMastery[]
  categories: SkillCategory[]
}>()

const groupedSkills = computed(() => {
  const result: { [categoryName: string]: SkillMastery[] } = {}

  const orderedCategories = [
    'Programming languages',
    'Frontend',
    'Backend',
    'Testing frameworks and tools',
    'DevOps',
    'Source control systems'
  ]

  props.skills.forEach((skillObj) => {
    const category = props.categories.find(
      (cat) =>
        cat.id === skillObj.categoryId ||
        (cat.parent && cat.parent.id === skillObj.categoryId)
    )

    const categoryName = category
      ? category.parent
        ? category.parent.name
        : category.name
      : ''

    if (!result[categoryName]) {
      result[categoryName] = []
    }
    result[categoryName].push(skillObj)
  })
  const sortedResult: { [categoryName: string]: SkillMastery[] } = {}

  orderedCategories.forEach((categoryName) => {
    if (result[categoryName]) {
      sortedResult[categoryName] = result[categoryName]
    }
  })
  return sortedResult
})
</script>

<style scoped>
.title {
  @apply mb-2 mt-4 text-base font-bold leading-6;
}
</style>
