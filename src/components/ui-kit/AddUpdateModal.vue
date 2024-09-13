<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="header"
    :style="{ width: '35rem' }"
    @hide="onHide"
  >
    <SelectComp
      class="my-5"
      v-model="capability"
      :options="reworkedData"
      :placeholder="capabilityPlaceholder"
      :disabled="capabilityDisability"
      :grouped="grouped"
    />
    <SelectComp
      class="my-5"
      v-model="levelProficiency"
      :options="reworkedProficiency"
      :placeholder="levelProficiencyPlaceholder"
      :disabled="!capability"
    />

  <div class="flex justify-end gap-5">
    <div class="w-[150px]">
      <Button variant="text" color="secondary" @click="cancel">{{$t('cancel')}}</Button>
    </div>
    <div class="w-[150px]">
      <Button variant="contained" color="primary" @click="confirm" :disabled="buttonDisability">{{$t('confirm')}}</Button>
    </div>
  </div>
</Dialog>
</template>

<script setup lang="ts">
import Button from '@/components/ui-kit/Button.vue'
import Dialog from 'primevue/dialog'
import SelectComp from '@/components/ui-kit/SelectComp.vue'
import { computed, toRefs, ref, watchEffect, watch } from 'vue'
import type { Option } from '@/components/ui-kit/SelectComp.vue'
import { useI18n } from 'vue-i18n';
import { HEADER_TYPES } from './constants/constants'

const { t } = useI18n();
const props = defineProps({
  type: String,
  name: String,
  modelValue: Boolean,
  commonData: Array,
  commonProficiency: Array,
  dataToUpdate: Object,
  grouped: {
    type: Boolean,
    default: () => false
  }
})
const {
  type,
  name,
  modelValue,
  commonData,
  commonProficiency,
  dataToUpdate,
  grouped
} = toRefs(props)
const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const visible = computed({
  get: () => modelValue.value,
  set: (value) => emit('update:modelValue', value)
})

const cancel = () => {
  emit('cancel')
  visible.value = false
}
const confirm = () => {
  emit('confirm', { capability, levelProficiency })
  visible.value = false
}

const reworkedData = ref<Option[]>([])
const reworkedProficiency = ref<Option[]>([])
const capability = ref()
const levelProficiency = ref()

const header = computed(() => type?.value === HEADER_TYPES.ADD
    ? (name?.value === 'Language' ? t('addLanguage') : t('addSkill'))
    : name?.value === 'Language' ? t('updateLanguage') : t('updateSkill')
)
const capabilityPlaceholder = computed(() => t(name?.value.toLowerCase()) || "")
const levelProficiencyPlaceholder = computed(() => name?.value === 'Language' ? t('langProficiency') : t('skillMastery'))

const capabilityDisability = computed(
  () => !!dataToUpdate?.value && type?.value ===  HEADER_TYPES.UPDATE
)

const buttonDisability = computed(() => {
  return type?.value == HEADER_TYPES.ADD
    ? !capability.value && !levelProficiency.value
    : !(levelProficiency.value.name !== dataToUpdate?.value?.levelProficiency)
})

const onHide = () => {
  capability.value = null
  levelProficiency.value = null
}
const dataForGrouped = (data) => {
  const result = data.reduce((acc, item) => {
    const label = item.type || item.category

    const existingCategory = acc.find((category) => category.label === label)

    if (existingCategory) {
      existingCategory.items.push({ ...item, name: item.name, id: item.id })
    } else {
      acc.push({
        label: label,
        items: [{ ...item, name: item.name, id: item.id }]
      })
    }
    return acc
  }, [])
  return result
}

watchEffect(() => {
  if (commonData?.value && !grouped.value) {
    reworkedData.value = commonData?.value?.map((obj) => {
      return { ...obj, id: obj?.id, name: obj?.name }
    })
  } else if (commonData?.value && grouped.value) {
    reworkedData.value = dataForGrouped(commonData.value)
  }

  if (commonProficiency?.value) {
    reworkedProficiency.value = commonProficiency?.value?.map((el, idx) => {
      return { name: el.toString(), id: idx.toString() }
    })
  }

  if (dataToUpdate?.value && type?.value === HEADER_TYPES.UPDATE) {
    capability.value = reworkedData.value.find(
      (el) => el.name === dataToUpdate?.value?.capability
    )
    levelProficiency.value = reworkedProficiency.value.find(
      (el) => el.name == dataToUpdate?.value?.levelProficiency
    )
  }
})

watch(capability, (newVal) => {
  if (newVal && type?.value ===  HEADER_TYPES.ADD) {
    levelProficiency.value = reworkedProficiency.value[0]
  }
})
</script>
