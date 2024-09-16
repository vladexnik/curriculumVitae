<template>
  <table v-if="tableDataArray" class="w-full">
    <thead class="h-14">
      <tr class="cv-preview__table-head">
        <th class="px-4 py-2 text-left" colspan="2">{{ $t('skills') }}</th>
        <th class="w-[90px] px-4 py-2">{{ $t('experienceInYears') }}</th>
        <th class="w-[90px] px-4 py-2">{{ $t('lastUsed') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        :class="{
          'cv-preview__table-body-border':
            index === tableDataArray.length - 1 ||
            tableDataArray[index + 1].category !== skill.category
        }"
        v-for="(skill, index) in tableDataArray"
        :key="skill.name"
      >
        <td
          v-if="
            index === 0 || tableDataArray[index - 1].category !== skill.category
          "
          class="min-w-[150px] max-w-[240px] px-4 py-2 text-primary"
        >
          {{ skill.category }}
        </td>
        <td v-else class="w-[240px] px-4 py-2"></td>

        <td class="px-4 py-2 text-left">{{ skill.name }}</td>
        <td class="px-4 py-2 text-center">{{ skill.experience }}</td>
        <td class="px-4 py-2 text-center">
          {{ new Date(skill.lastUsed).getFullYear() || '' }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { SkillCategory, TableDataArray } from '@/models/models'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  skillsCategories: SkillCategory[]
  cvData: unknown
}>()

const categories = [
    ['Programming Languages', t('programmingLang')],
    ['Frontend', t('frontend')],
    ['Backend', t('backend')],
    ['Testing frameworks and tools', t('testTools')],
    ['DevOps', t('devOps')],
    ['Source control systems', t('sourceControl')],
  ]

const tableDataArray: TableDataArray[] = props.cvData.skills
  .map((skill) => {
    const categoryId = skill.categoryId || null
    let categoryName = props.skillsCategories.find((cat) => cat.id === categoryId)?.name || null
     let category = (categories.find(el => el[0]?.toLowerCase() === categoryName?.toLowerCase()))
     if (category) {
      category = category[1]
     } else {
      category = categoryName
     }
    const relevantProjects = props.cvData.projects.filter((project) =>
      project.environment.includes(skill.name)
    )

    if (relevantProjects.length === 0) {
      return {
        categoryId,
        category: category,
        name: skill.name,
        experience: null,
        lastUsed: ''
      }
    }

    let farthestStartDate = relevantProjects[0].start_date
    let nearestEndDate =
      relevantProjects[0].end_date || new Date().toISOString().split('T')[0]

    relevantProjects.forEach((project) => {
      if (new Date(project.start_date) < new Date(farthestStartDate)) {
        farthestStartDate = project.start_date
      }
      if (
        project.end_date &&
        new Date(project.end_date) > new Date(nearestEndDate)
      ) {
        nearestEndDate = project.end_date
      }
    })

    const experience =
      new Date(nearestEndDate).getFullYear() -
      new Date(farthestStartDate).getFullYear()
    console.log('el0', category)
    return {
      categoryId,
      category: category,
      name: skill.name,
      experience: experience,
      lastUsed: nearestEndDate
    }
  })
  .sort((a, b) => parseInt(a.categoryId ?? '0') - parseInt(b.categoryId ?? '0'))
</script>

<style scoped>
.cv-preview__table-head {
  @apply border-b-2 border-primary uppercase;
}

.cv-preview__table-body-border {
  @apply border-b-[1px] border-textMain;
}
</style>
