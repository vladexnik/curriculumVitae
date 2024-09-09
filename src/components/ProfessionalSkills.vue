<template>
  <table v-if="resultedArray" class="w-full">
    <thead class="h-14">
      <tr class="cv-preview__table-head">
        <th class="px-4 py-2 text-left" colspan="2">Skills</th>
        <th class="w-[90px] px-4 py-2">Experience in Years</th>
        <th class="w-[90px] px-4 py-2">Last Used</th>
      </tr>
    </thead>
    <tbody>
      <tr
        :class="{
          'cv-preview__table-body-border':
            index === resultedArray.length - 1 ||
            resultedArray[index + 1].category !== skill.category
        }"
        v-for="(skill, index) in resultedArray"
        :key="skill.name"
      >
        <td
          v-if="
            index === 0 || resultedArray[index - 1].category !== skill.category
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
import type { CVData, SkillCategory } from '@/models/models'

const props = defineProps<{
  skillsCategories: SkillCategory[]
  cvData: CVData
}>()

const resultedArray = props.cvData.skills
  .map((skill) => {
    const categoryId = skill.categoryId || '2'
    const category = props.skillsCategories.find((cat) => cat.id === categoryId)

    const relevantProjects = props.cvData.projects.filter((project) =>
      project.environment.includes(skill.name)
    )

    if (relevantProjects.length === 0) {
      return {
        categoryId,
        category: category?.name,
        name: skill.name,
        experience: '',
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

    return {
      categoryId,
      category: category?.name,
      name: skill.name,
      experience: experience,
      lastUsed: nearestEndDate
    }
  })
  .sort((a, b) => parseInt(a.categoryId) - parseInt(b.categoryId))

console.log(resultedArray, props.cvData)
</script>

<style scoped>
.cv-preview__table-head {
  @apply border-b-2 border-primary uppercase;
}

.cv-preview__table-body-border {
  @apply border-b-[1px] border-textMain;
}
</style>
