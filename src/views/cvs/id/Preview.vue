<template>
  <div
    v-if="fullCvData && categories"
    class="mx-auto flex w-full max-w-[900px] flex-col justify-center px-6 py-8"
  >
    <section class="mb-8">
      <div class="flex h-[40px] items-end justify-between">
        <h4 class="text-3xl">{{ fullCvData.user.profile.full_name }}</h4>
        <Button
          class="!h-10 !w-[200px]"
          variant="outlined"
          color="primary"
          @click="handleExportPDF"
        >
          Export PDF
        </Button>
      </div>
      <p class="uppercase">{{ fullCvData.user.position_name }}</p>
    </section>
    <section class="mb-8 grid grid-cols-[260px_auto]">
      <div class="pr-6">
        <p class="title">Education</p>
        <p>{{ fullCvData.education || 'No education' }}</p>
        <p class="title">Language proficiency</p>
        <ul>
          <li v-for="(item, index) in fullCvData.languages" :key="index">
            {{ item.name }} - {{ item.proficiency }}
          </li>
        </ul>
        <p class="title">Domains</p>
        <ul>
          <li v-for="(item, index) in fullCvData.projects" :key="index">
            {{ item.domain }}
          </li>
        </ul>
      </div>
      <div class="border-l-2 border-l-primary pb-4 pl-6">
        <p class="title">{{ fullCvData.name }}</p>
        <p>{{ fullCvData.description }}</p>
        <SkillsLayout :skills="fullCvData.skills" :categories="categories" />
      </div>
    </section>
    <section class="mb-8">
      <p class="text-3xl">Projects</p>
      <li
        class="list-none"
        v-for="(project, index) in fullCvData.projects"
        :key="index"
      >
        <ProjectLayout
          :project="project"
          :role="fullCvData.user.position_name"
        />
      </li>
    </section>
    <section>
      <p class="bg-red-500 text-3xl">Professional skills</p>
      <ProfessionalSkills :categories="categories" :cvData="fullCvData" />
    </section>
  </div>
</template>
<script lang="ts" setup>
import SkillsLayout from '@/components/SkillsLayout.vue'
import Button from '@/components/ui-kit/Button.vue'
import { exportPDFCv, getCVPreview, getSkillCategories } from '@/service/cvs'
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ProjectLayout from '@/components/ProjectLayout.vue'
import ProfessionalSkills from '@/components/ProfessionalSkills.vue'

const route = useRoute()
const id = computed(() => route.params.id as string)
const fullCvData = ref<any | null>(null)
const categories = ref()

const getCVData = async () => {
  fullCvData.value = await getCVPreview(id.value)
  categories.value = await getSkillCategories()
  console.log('cvData', fullCvData.value)
  console.log(categories.value)
}

const handleExportPDF = async () => {
  const pageHtml = document.querySelector('.mx-auto')?.outerHTML
  const tailwindCss = await fetch('/tailwind.config.js').then((res) =>
    res.text()
  )
  console.log(pageHtml)

  if (pageHtml) {
    const completeHtml = `
      <html>
        <head>
          <style>${tailwindCss}</style>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          ${pageHtml}
        </body>
      </html>
    `
    const pdfInput = {
      html: completeHtml,
      margin: {
        top: '20px',
        bottom: '20px',
        left: '15px',
        right: '15px'
      }
    }

    try {
      let result = await exportPDFCv(pdfInput)
      console.log('PDF export result:', result)
      if (result.startsWith('JVB')) {
        result = 'data:application/pdf;base64,' + result
        downloadFileObject(result)
      }
    } catch (error) {
      console.error('Error exporting PDF:', error)
    }
  } else {
    console.error('Unable to find the HTML content for PDF export.')
  }
}

function downloadFileObject(base64String) {
  const linkSource = base64String
  const downloadLink = document.createElement('a')
  const fileName = 'convertedPDFFile.pdf'
  downloadLink.href = linkSource
  downloadLink.download = fileName
  downloadLink.click()
}

watchEffect(() => {
  getCVData()
})
</script>

<style>
.title {
  @apply mb-2 mt-4 text-base font-bold leading-6;
}
</style>
