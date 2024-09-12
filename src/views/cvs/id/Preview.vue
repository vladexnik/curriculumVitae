<template>
  <Toast />
  <div v-if="fullCvData && skillsCategories" class="cv-preview">
    <section class="cv-preview__user-wrapper mb-8">
      <div class="cv-preview__user-data">
        <h4 class="text-3xl">{{ fullCvData.user.profile.full_name }}</h4>
        <Button
          class="cv-preview__button"
          variant="outlined"
          color="primary"
          :disabled="isDisabled"
          @click="handleExportPDF"
        >
          {{ $t('exportPDF') }}
        </Button>
      </div>
      <p class="uppercase">{{ fullCvData.user.position_name }}</p>
    </section>
    <section class="cv-preview__cv-description mb-8">
      <div class="cv-preview__cv-description__left-side pr-6">
        <p class="title"> {{ $t('education') }}</p>
        <p>{{ fullCvData.education || NO_EDUCATION }}</p>
        <p class="title"> {{ $t('langProficiency') }}</p>
        <ul>
          <li v-for="(item, index) in fullCvData.languages" :key="index">
            {{ item.name }} - {{ item.proficiency }}
          </li>
        </ul>
        <p class="title">{{ $t('domain', fullCvData.projects.length) }}</p>
        <ul>
          <li v-for="(item, index) in fullCvData.projects" :key="index">
            {{ item.domain }}
          </li>
        </ul>
      </div>
      <div class="cv-preview__cv-description__right-side">
        <p class="title">
          {{ fullCvData.name }}
        </p>
        <p>{{ fullCvData.description }}</p>
        <SkillsLayout
          :skills="fullCvData.skills"
          :skillsCategories="skillsCategories"
        />
      </div>
    </section>
    <section
      class="cv-preview__projects-wrapper pagebreak-after pagebreak mb-8"
    >
      <p class="mb-8 text-3xl">{{ $t('projects') }}</p>
      <li
        class="cv-preview__project-item pagebreak-inside-avoid mb-8 list-none"
        v-for="(project, index) in fullCvData.projects"
        :key="index"
      >
        <ProjectLayout
          :project="project"
          :role="fullCvData.user.position_name"
        />
      </li>
    </section>
    <section class="cv-preview__professional-skills pagebreak">
      <p class="text-3xl">{{ $t('professionalSkills') }}</p>
      <ProfessionalSkills
        :skillsCategories="skillsCategories"
        :cvData="fullCvData"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
import SkillsLayout from '@/components/SkillsLayout.vue'
import Button from '@/components/ui-kit/Button.vue'
import { exportPDFCV, getCVPreview } from '@/service/cvs'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ProjectLayout from '@/components/ProjectLayout.vue'
import ProfessionalSkills from '@/components/ProfessionalSkills.vue'
import { PDF_STYLES } from '@/components/ui-kit/constants/pdf-styles'
import { useToastNotifications } from '@/composables/useToast'
import { useSkillsStore } from '@/stores/skills'
import { storeToRefs } from 'pinia'
import type { CVData } from '@/models/models'
import { NO_EDUCATION } from '@/components/ui-kit/constants/constants'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const route = useRoute()
const { showError, showSuccessUpload, showProfileUpdate, showInfo } =
  useToastNotifications()
const skillsStore = useSkillsStore()
const { skillsCategories } = storeToRefs(skillsStore)

const id = computed(() => route.params.id as string)
const isDisabled = ref(false)
const fullCvData = ref<CVData | undefined | null>(null)

onMounted(async () => {
  try {
    fullCvData.value = await getCVPreview(id.value)
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.dir(e)
      showError(e.message)
    } else {
      showError('An unknown error occurred. Try to reload the page')
    }
  }
})

const handleExportPDF = async () => {
  const pageHtml = document.querySelector('.cv-preview')?.outerHTML
  isDisabled.value = true
  const completeHtml = `
      <html>
        <head>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css" rel="stylesheet">
          <style>
            ${PDF_STYLES}
          </style>
        </head>
        <body>
          ${pageHtml}
        </body>
      </html>
    `
  const pdfInput = {
    html: completeHtml,
    margin: {
      top: '35px',
      bottom: '35px',
      left: '40px',
      right: '40px'
    }
  }

  try {
    showInfo()
    let result = await exportPDFCV(pdfInput)
    if (result.startsWith('JVB')) {
      result = 'data:application/pdf;base64,' + result
      downloadFileObject(result)
      setTimeout(() => {
        isDisabled.value = false
      }, 2000)
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.dir(e)
      showError(e.message)
    } else {
      showError('An unknown error occurred. Try to reload the page')
    }
  }
}

const downloadFileObject = (base64String: string) => {
  const linkSource = base64String
  const downloadLink = document.createElement('a')
  const fileName = `${fullCvData.value?.name}`
  downloadLink.href = linkSource
  downloadLink.download = fileName
  downloadLink.click()
}
</script>

<style>
.cv-preview {
  @apply mx-auto flex w-full max-w-[900px] flex-col justify-center px-6 py-8;
}

.cv-preview__user-data {
  @apply flex h-[40px] items-end justify-between;
}

.cv-preview__cv-description {
  @apply grid grid-flow-col grid-cols-[260px_auto];
}

.cv-preview__cv-description__right-side {
  @apply border-l-2 border-l-primary pb-4 pl-6;
}

.cv-preview__button {
  @apply h-10 w-[200px];
}

.title {
  @apply mb-2 mt-4 text-base font-bold leading-6;
}
</style>
