<template>
  <div v-if="groupedSkills" class="skills-container">
    <div v-for="(skills, categoryName) in groupedSkills" :key="categoryName">
      <h3 class="mb-2 mt-4 text-base font-bold leading-6">
        {{ categoryName }}
      </h3>
      <ul class="list-none p-0">
        <span>
          {{ skills.map((skill) => skill.name).join(', ') }}
        </span>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SkillCategory } from '@/models/models'
import type { SkillMastery } from 'cv-graphql'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  skills: SkillMastery[]
  skillsCategories: SkillCategory[]
}>()

const groupedSkills = computed(() => {
  const result: { [categoryName: string]: SkillMastery[] } = {}

  const orderedCategories = [
    ['Programming Languages', t('programmingLang')],
    ['Frontend', t('frontend')],
    ['Backend', t('backend')],
    ['Testing frameworks and tools', t('testTools')],
    ['DevOps', t('devOps')],
    ['Source control systems', t('sourceControl')],
  ]

  props.skills.forEach((skillObj) => {
    const category = props.skillsCategories.find(
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
    if (result[categoryName[0]]) {
      sortedResult[categoryName[1]] = result[categoryName[0]]
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
