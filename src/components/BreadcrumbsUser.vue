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
<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import Breadcrumb from 'primevue/breadcrumb'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getUserName } from '@/service/userData'
import { capitalizeFullName, truncateString } from '@/utils'
import { getCVNameById } from '@/service/cvs'
import { useToastNotifications } from '@/composables/useToast'
import type { breadcrumbObjT } from '@/models/models'

const route = useRoute()
const { showError } = useToastNotifications()

const userStore = useUserStore()
const userFullname = computed(
  () => userStore.authedUser?.profile?.full_name || userStore.authedUser?.email
)

const userId = computed(() => userStore.authedUser?.id)
const id = computed(() => route.params.id as string)
const breadcrumbName = ref<{ id: string; name: string } | string | null>(
  `${id.value}`
)

const fetchBreadcrumbName = async () => {
  if (route.path.includes(`/users/${route.params.id}`)) {
    if (id.value && id.value !== userId.value) {
      try {
        const data = await getUserName(id.value)
        breadcrumbName.value = capitalizeFullName(
          data.profile.full_name || data.email
        )
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.dir(e)
          showError('Couldnt find name of user')
        } else {
          showError('An unknown error occurred. Try to reload the page')
        }
      }
    } else if (id.value === userId.value) {
      breadcrumbName.value = capitalizeFullName(userFullname.value || '')
    }
  }
  if (id.value && route.path.includes(`/cvs/${route.params.id}`)) {
    breadcrumbName.value = await getCVNameById(id.value)
    breadcrumbName.value = truncateString(breadcrumbName.value.name)
  }
}

watchEffect(() => {
  try {
    fetchBreadcrumbName()
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.dir(e)
      showError(e.message)
    } else {
      showError('An unknown error occurred. Try to reload the page')
    }
  }
})
const items = computed(() => {
  let breadcrumbs: Array<breadcrumbObjT> = [
    {
      label: route.meta.breadcrumb as string,
      route: { name: route.name as string },
      styleClass: 'text-textSec opacity-60 cursor-default'
    }
  ]

  if (id.value) {
    if (route.path.includes(`/users/${route.params.id}`)) {
      breadcrumbs = [
        {
          label: 'Employees',
          route: { name: 'Employees' },
          styleClass:
            'border-b-2 border-transparent text-textSec hover:border-b-2 hover:border-textSec'
        }
      ]
      breadcrumbs.push({
        label: breadcrumbName.value as string,
        route: { name: 'Employee', params: { id: id.value } },
        styleClass:
          'border-b-2 border-transparent text-primary hover:border-b-2 hover:border-primary'
      })
      if (route.name && route.name !== 'Employee') {
        breadcrumbs.push({
          label: route.meta.breadcrumb as string,
          route: { name: 'Employees' },
          styleClass: 'text-textSec'
        })
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
        label: breadcrumbName.value as string,
        route: { name: 'CVId', params: { id: id.value } },
        styleClass:
          'border-b-2 border-transparent text-primary hover:border-b-2 hover:border-primary'
      })
      if (route.name && route.name !== 'CVId') {
        breadcrumbs.push({
          label: route.meta.breadcrumb as string,
          route: { name: 'CVsList' },
          styleClass: 'text-textSec'
        })
      }
    }

    if (breadcrumbs.length > 0) {
      breadcrumbs[breadcrumbs.length - 1].route = null
    }
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
