<template>
  <div
    v-if="fetchedCVPreview && categories"
    class="mx-auto flex w-full max-w-[900px] flex-col justify-center px-6 py-8"
  >
    <section class="mb-8">
      <div class="flex h-[40px] items-end justify-between">
        <h4 class="text-3xl">{{ fetchedCVPreview.user.profile.full_name }}</h4>
        <Button class="!h-10 !w-[200px]" variant="outlined" color="primary">
          Export PDF
        </Button>
      </div>
      <p class="uppercase">{{ fetchedCVPreview.user.position_name }}</p>
    </section>
    <div class="grid grid-cols-[260px_auto]">
      <section class="pr-6">
        <p class="title">Education</p>
        <p>{{ fetchedCVPreview.education || 'No education' }}</p>
        <p class="title">Language proficiency</p>
        <ul>
          <li v-for="(item, index) in fetchedCVPreview.languages" :key="index">
            {{ item.name }} - {{ item.proficiency }}
          </li>
        </ul>
        <p class="title">Domains</p>
        <ul>
          <li v-for="(item, index) in fetchedCVPreview.projects" :key="index">
            {{ item.domain }}
          </li>
        </ul>
      </section>
      <section class="border-l border-l-2 border-l-primary pb-4 pl-6">
        <p class="title">{{ fetchedCVPreview.name }}</p>
        <p>{{ fetchedCVPreview.description }}</p>
        <SkillsLayout
          :skills="fetchedCVPreview.skills"
          :categories="categories"
        />
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SkillsLayout from '@/components/SkillsLayout.vue'
import Button from '@/components/ui-kit/Button.vue'
import { getCVPreview, getSkillCategories } from '@/service/cvs'
import { useUserStore } from '@/stores/user'
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

// const userStore = useUserStore()
const route = useRoute()
const id = computed(() => route.params.id as string)
const fetchedCVPreview = ref<any | null>(null)
const categories = ref()

const getCVData = async () => {
  fetchedCVPreview.value = await getCVPreview(id.value)
  categories.value = await getSkillCategories()
  console.log('cvData', fetchedCVPreview.value)
  console.log(categories.value)
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
