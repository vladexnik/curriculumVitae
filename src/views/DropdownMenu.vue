<template>
  <aside
    :class="[
      'transition-width flex h-screen flex-col place-content-between overflow-y-auto overflow-x-hidden pb-4 pt-11 text-black duration-500',
      isCollapsed ? 'w-14' : 'w-[200px]'
    ]"
  >
    <nav>
      <ul class="flex flex-col gap-3">
        <MenuItem
          v-for="item in mainMenuItems"
          :key="item.label"
          :label="item.label"
          :icon="item.icon"
          :isActive="activeItem?.route === item.route"
          :isCollapsed="isCollapsed"
          @click="setActiveItem(item)"
        />
        <hr class="m-2" />
        <MenuItem
          v-for="item in secondaryMenuItems"
          :key="item.label"
          :label="item.label"
          :icon="item.icon"
          :isActive="activeItem?.route === item.route"
          :isCollapsed="isCollapsed"
          @click="setActiveItem(item)"
        />
      </ul>
    </nav>
    <div class="flex flex-col gap-4">
      <Button
        type="button"
        :class="[
          'rounded-br-3xl rounded-tr-3xl',
          isCollapsed ? 'w-14' : 'w-[200px]'
        ]"
        @click="openModal"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        unstyled
      >
        <MenuItem
          v-if="userData"
          ref="profileUser"
          class="profileuser flex items-center gap-2 whitespace-nowrap pl-[10px] !text-textMain hover:bg-optionHover"
          :label="
            fullName?.length >= 17
              ? fullName.slice(0, 17) + '...'
              : fullName || 'user'
          "
          :isCollapsed="isCollapsed"
        >
          <template #avatar>
            <Avatar
              v-if="!avatar"
              label="V"
              class="text-bgColor"
              style="background-color: var(--color-primary)"
              shape="circle"
            />
            <Avatar v-else :image="avatar" shape="circle" />
          </template>
        </MenuItem>
        <div
          v-else
          ref="profileUser"
          class="profileuser mb-1 flex items-center gap-2 pl-[10px]"
          :isCollapsed="isCollapsed"
        >
          <Skeleton shape="circle" size="2rem"></Skeleton>
          <Skeleton height="1.5rem" width="8rem" />
        </div>
      </Button>
      <Menu
        class="!left-5 w-[200px] rounded-md border-none bg-bgColor py-1 shadow-md shadow-secondary"
        ref="menu"
        id="overlay_menu"
        :model="modalMenuItems"
        :popup="true"
        unstyled
      >
        <template #item="{ item }">
          <template v-if="item.label === 'Logout'">
            <hr class="m-2" />
          </template>
          <li
            v-ripple
            class="cursor-pointer px-4 py-2 text-textMain hover:bg-optionHover active:bg-optionHoverActive"
            @click="
              item.label === 'Logout' ? handleLogout() : router.push(item.route)
            "
          >
            <span :class="item.icon"></span>
            <span class="ml-2">{{ item.label }}</span>
          </li>
        </template>
      </Menu>
      <div
        class="ml-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-optionHover"
        @click="toggleCollapse"
      >
        <i
          style="font-size: 0.75rem; color: var(--text-secondary)"
          :class="isCollapsed ? 'pi pi-chevron-right' : 'pi pi-chevron-left'"
        ></i>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MenuItem from '@/components/ui-kit/MenuItem.vue'
import Avatar from 'primevue/avatar'
import Skeleton from 'primevue/skeleton'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import { useUserStore } from '@/stores/user'

const menu = ref()
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const isCollapsed = ref(false)

const userData = computed(() => userStore.authedUser?.user)
const fullName = computed(
  () => userData.value?.profile?.full_name || userData.value?.email || null
)
const avatar = computed(() => userData.value?.profile?.avatar || '')

const mainMenuItems = ref([
  { label: 'Employees', icon: 'pi pi-users', route: '/users' },
  { label: 'Projects', icon: 'pi pi-folder', route: '/projects' },
  { label: 'CVs', icon: 'pi pi-file', route: '/cvs' }
])

const secondaryMenuItems = ref([
  { label: 'Departments', icon: 'pi pi-building', route: '/departments' },
  { label: 'Positions', icon: 'pi pi-briefcase', route: '/positions' },
  { label: 'Skills', icon: 'pi pi-chart-line', route: '/skills' },
  { label: 'Languages', icon: 'pi pi-globe', route: '/languages' }
])
const modalMenuItems = ref([
  {
    route: computed(() => `/users/${userData.value.id}`),
    label: 'Profile',
    icon: 'pi pi-user'
  },
  {
    route: '/settings',
    label: 'Settings',
    icon: 'pi pi-cog'
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out'
  }
])

const activeItem = computed(() => {
  const allMenuItems = [...mainMenuItems.value, ...secondaryMenuItems.value]
  return allMenuItems.find((item) => item.route === route.path) || null
})

const setActiveItem = (item: {
  label: string
  icon: string
  route: string
}) => {
  router.push(item.route)
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleLogout = () => {
  userStore.logout()
}

const openModal = (event) => {
  menu.value.toggle(event)
}
</script>
<style scoped></style>
