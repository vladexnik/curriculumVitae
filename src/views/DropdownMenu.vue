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
        <hr />
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
      <MenuItem
        class="flex items-center gap-2 pl-[10px] !text-textMain hover:bg-optionHover"
        label="Vladislav"
        :isCollapsed="isCollapsed"
      >
        <template #avatar>
          <Avatar
            label="V"
            class="text-bgColor"
            style="background-color: var(--color-primary)"
            shape="circle"
          />
        </template>
      </MenuItem>

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
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MenuItem from '@/components/ui-kit/MenuItem.vue'
import Avatar from 'primevue/avatar'

const isCollapsed = ref(false)

const mainMenuItems = ref([
  { label: 'Employees', icon: 'pi pi-users', route: '/' },
  { label: 'Projects', icon: 'pi pi-folder', route: '/projects' },
  { label: 'CVs', icon: 'pi pi-file', route: '/cvs' }
])

const secondaryMenuItems = ref([
  { label: 'Departments', icon: 'pi pi-building', route: '/departments' },
  { label: 'Positions', icon: 'pi pi-briefcase', route: '/positions' },
  { label: 'Skills', icon: 'pi pi-chart-line', route: '/skills' },
  { label: 'Languages', icon: 'pi pi-globe', route: '/languages' }
])

const activeItem = computed(() => {
  const allMenuItems = [...mainMenuItems.value, ...secondaryMenuItems.value]
  return allMenuItems.find((item) => item.route === route.path) || null
})

const router = useRouter()
const route = useRoute()

function setActiveItem(item: { label: string; icon: string; route: string }) {
  router.push(item.route)
}

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}
</script>
