<template>
  <div class="skills-container">
    <div
      v-for="(skills, categoryName) in groupedSkills"
      :key="categoryName"
      class="category"
    >
      <h3 class="category-title">{{ categoryName }}</h3>
      <ul class="skills-list">
        <span v-for="skill in skills" :key="skill.name" class="skill-item">
          {{ skill.name }}
        </span>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface SkillMastery {
  __typename: string
  name: string
  categoryId: string | null
  mastery: string
}

interface SkillCategory {
  __typename: string
  id: string
  name: string
  order: number
}

const props = defineProps<{
  skills: SkillMastery[]
  categories: SkillCategory[]
}>()

// Map skills to categories
const groupedSkills = computed(() => {
  const categoryMap = props?.categories?.reduce(
    (map: { [key: string]: string }, category: SkillCategory) => {
      map[category.id] = category.name
      return map
    },
    {}
  )

  return props.skills.reduce(
    (grouped: { [key: string]: SkillMastery[] }, skill: SkillMastery) => {
      const categoryName = skill.categoryId
        ? categoryMap[skill.categoryId]
        : 'Uncategorized'
      if (!grouped[categoryName]) {
        grouped[categoryName] = []
      }
      grouped[categoryName].push(skill)
      return grouped
    },
    {}
  )
})
</script>

<style scoped>
.category {
  margin-bottom: 20px;
}

.title {
  @apply mb-2 mt-4 text-base font-bold leading-6;
}

.category-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.skills-list {
  list-style-type: none;
  padding: 0;
}

.skill-item {
  margin: 5px 0;
}
</style>
