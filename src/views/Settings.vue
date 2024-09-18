<template>
  <div class="mx-auto w-full max-w-[720px] py-8">
    <div class="flex flex-col gap-8">
      <SelectComp
        v-model="themeStore.selectedTheme"
        :options="themeStore.themes"
        :placeholder="t('appearance')"
      />
      <SelectComp
        v-model="langStore.selectedLang"
        :options="langStore.langs"
        :placeholder="t('language')"
      />
    </div>
  </div>
</template>

<style></style>
<script setup lang="ts">
import SelectComp from '@/components/ui-kit/SelectComp.vue'
import { useThemeStore } from '@/stores/theme'
import { useLangStore } from '@/stores/lang'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const themeStore = useThemeStore()
const langStore = useLangStore()
</script>
