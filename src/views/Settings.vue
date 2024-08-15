<template>
  <div class="mx-auto w-full max-w-[720px] py-8">
    <div class="flex flex-col gap-8">
      <SelectComp
        v-model="themeStore.selectedTheme"
        :options="themeStore.themes"
        placeholder="Appearance"
      />
      <SelectComp
        v-model="langStore.selectedLang"
        :options="langStore.langs"
        placeholder="Language"
      />
    </div>
  </div>
</template>

<style></style>
<script setup lang="ts">
import SelectComp from '@/components/ui-kit/SelectComp.vue'
import { useThemeStore } from '@/stores/theme'
import { useLangStore } from '@/stores/lang'

const themeStore = useThemeStore()
const langStore = useLangStore()
</script>
<!-- --p-select-option-focus-background -->
