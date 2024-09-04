<template>
  <div class="flex justify-start bg-transparent">
    <Breadcrumb :model="items">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a :href="href" v-bind="props.action" @click="navigate">
            <span
              v-if="item.icon"
              :class="[
                item.icon,
                'text-primary',
                'border-b-4',
                'pr-2',
                'border-transparent'
              ]"
            />
            <span :class="item.styleClass">{{ item.label }}</span>
          </a>
        </router-link>
        <span
          v-else
          :class="[
            items.length === 3 && 'text-textSec',
            items.length === 2 && 'text-primary',
            items.length === 1 && 'text-textSec',
            'opacity-60'
          ]"
        >
          <span v-if="item.icon" class="pr-2" :class="[item.icon]" />
          <span>{{ item.label }} </span>
        </span>
      </template>
    </Breadcrumb>
  </div>
</template>
<script setup>
import { computed, ref, watchEffect } from 'vue'
import Breadcrumb from 'primevue/breadcrumb'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getUserName } from '@/service/userData'
import { capitalizeFullName, truncateString } from '@/utils'
import { getCVNameById } from '@/service/cvs'

const route = useRoute()

const userStore = useUserStore()
const userFullname = computed(
  () => userStore.authedUser?.profile?.full_name || userStore.authedUser?.email
)
const userId = computed(() => userStore.authedUser?.id)
const id = computed(() => route.params.id)
const breadcrumbFullname = ref(`${id.value}`)
const cvData = ref(null)

const fetchBreadcrumbName = async () => {
  if (route.path.includes(`/users/${route.params.id}`)) {
    if (id.value && id.value !== userId.value) {
      const data = await getUserName(id.value)
      breadcrumbFullname.value = capitalizeFullName(
        data.profile.full_name || data.email
      )
    } else {
      breadcrumbFullname.value = capitalizeFullName(userFullname.value)
    }
  }
  if (id.value && route.path.includes(`/cvs/${route.params.id}`)) {
    console.log(id.value, `/cvs/${route.params.id}`)
    cvData.value = await getCVNameById(id.value)
    // console.log(cvData.value)
    breadcrumbFullname.value = truncateString(cvData.value.name)
  }
}

watchEffect(() => {
  fetchBreadcrumbName()
})

const items = computed(() => {
  let breadcrumbs = [
    {
      label: route.meta.breadcrumb,
      route: { name: route.name },
      styleClass: 'text-textSec opacity-60 cursor-default'
    }
  ]

  if (id.value) {
    if (route.path.includes(`/users/${route.params.id}`)) {
      breadcrumbs = [
        {
          label: 'Employeess',
          route: { name: 'Employees' },
          styleClass:
            'border-b-2 border-transparent text-textSec hover:border-b-2 hover:border-textSec'
        }
      ]
      breadcrumbs.push({
        label: breadcrumbFullname.value,
        route: { name: 'Employee', params: { id: id.value } },
        icon: 'pi pi-user',
        styleClass:
          'border-b-2 border-transparent text-primary hover:border-b-2 hover:border-primary'
      })

      switch (route.name) {
        case 'UserCvs':
          breadcrumbs.push({
            label: 'CVs',
            route: { name: 'Employees' }
          })
          break
        case 'UserSkills':
          breadcrumbs.push({
            label: 'Skills',
            route: { name: 'Employees' }
          })
          break
        case 'UserLanguages':
          breadcrumbs.push({
            label: 'Languages',
            route: { name: 'Employees' }
          })
          break
      }
    }
    if (route.path.includes(`/cvs/${route.params.id}`)) {
      breadcrumbs = [
        {
          label: 'CVs',
          route: { name: 'CVsAll' },
          styleClass:
            'border-b-2 border-transparent text-textSec hover:border-b-2 hover:border-textSec'
        }
      ]
      breadcrumbs.push({
        label: breadcrumbFullname.value,
        route: { name: 'CVId', params: { id: id.value } },
        styleClass:
          'border-b-2 border-transparent text-primary hover:border-b-2 hover:border-primary'
      })

      switch (route.name) {
        case 'CVSkills':
          breadcrumbs.push({
            label: 'Skills',
            route: { name: 'CVsList' }
          })
          break
        case 'CVProjects':
          breadcrumbs.push({
            label: 'Projects',
            route: { name: 'CVsList' }
          })
          break
        case 'CVPreview':
          breadcrumbs.push({
            label: 'Preview',
            route: { name: 'CVsList' }
          })
          break
      }
    }
    breadcrumbs[breadcrumbs.length - 1].route = null
    // console.log(breadcrumbs)
  }
  return breadcrumbs
})
</script>
<style scoped>
.p-breadcrumb {
  @apply bg-transparent p-0;
}

a.p-breadcrumb-item-link {
  @apply gap-0;
}
</style>
