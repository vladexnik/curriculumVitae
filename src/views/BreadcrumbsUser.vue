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
            <span :class="[item.icon, 'text-primary']" />
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
import { getUserData } from '@/service/userData'
import { capitalizeFullName } from '@/utils'

const route = useRoute()

const userStore = useUserStore()
const userFullname = computed(
  () =>
    userStore.authedUser?.user.profile.full_name ||
    userStore.authedUser?.user.email
)
const userId = computed(() => userStore.authedUser?.user.id)
const id = computed(() => route.params.id)
const breadcrumbFullname = ref(`${id.value}`)

const fetchBreadcrumbName = async () => {
  if (id.value && id.value !== userId.value) {
    const data = await getUserData(id.value)
    console.log(data.user.profile.full_name)
    breadcrumbFullname.value = capitalizeFullName(data.user.profile.full_name)
  } else {
    breadcrumbFullname.value = capitalizeFullName(userFullname.value)
  }
}

watchEffect(() => {
  fetchBreadcrumbName()
})

const items = computed(() => {
  let breadcrumbs = [
    { label: route.meta.breadcrumb, route: { name: route.name } }
  ]

  if (id.value) {
    breadcrumbs = [
      {
        label: 'Employees',
        route: { name: 'Employees' },
        styleClass:
          'border-b-2 border-transparent text-textSec hover:border-b-2 hover:border-textSec'
      }
    ]
    breadcrumbs.push({
      label: breadcrumbFullname,
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
  breadcrumbs[breadcrumbs.length - 1].route = null
  return breadcrumbs
})
</script>
<style scoped>
.p-breadcrumb {
  @apply bg-transparent p-0;
}
</style>
