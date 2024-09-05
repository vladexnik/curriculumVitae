<template>
  <Dialog v-model:visible="visible" modal :header="header" :style="{ width: '35rem' }" @hide="onHide">
  <SelectComp
      class="my-5"
      v-model="field1"
      :options="reworkedData"
      :placeholder="placeholder1"
      :disabled="field1Disability"
      :grouped="grouped"
    />
    <SelectComp
      class="my-5"
      v-model="field2"
      :options="reworkedProficiency"
      :placeholder="placeholder2"
      :disabled="!field1"
    />

  <div class="flex justify-end gap-5">
    <div class="w-[150px]">
      <Button variant="text" color="secondary" @click="cancel">Cancel</Button>
    </div>
    <div class="w-[150px]">
      <Button variant="contained" color="primary" @click="confirm" :disabled="buttonDisability">Confirm</Button>
    </div>
  </div>
</Dialog>
</template>

<script setup lang="ts">
import Button from '@/components/ui-kit/Button.vue';
import Dialog from 'primevue/dialog';
import SelectComp from '@/components/ui-kit/SelectComp.vue';
import { computed, toRefs, ref, watchEffect, watch } from 'vue';
import type { Option } from '@/components/ui-kit/SelectComp.vue'

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
  },
})
const { type, name, modelValue, commonData, commonProficiency, dataToUpdate, grouped } = toRefs(props)
const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const visible = computed({
  get: () => modelValue.value,
  set: (value) => emit('update:modelValue', value)
});

const cancel = () => {
  emit('cancel');
  visible.value = false;
}
const confirm = () => {
  emit('confirm', { field1, field2 });
  visible.value = false;
}

const reworkedData = ref<Option[]>([]);
const reworkedProficiency = ref<Option[]>([]);
const field1 = ref();
const field2 = ref();

const header = computed(() => {
  let res;
    switch (type?.value) {
      case 'Add': 
        res = 'Add ' + name?.value;
        break;
      case 'Update':
        res = 'Update ' + name?.value;
        break;
    }
  return res;
})
const placeholder1 = computed(() => name?.value || "")
const placeholder2 = computed(() => {
  let res;
    switch (name?.value) {
      case 'Language': 
        res = name?.value + ' Proficiency';
        break;
      case 'Skill':
        res = name?.value + ' Mastery';
        break;
    }
  return res;
})

const field1Disability = computed(() => (!!dataToUpdate?.value && type?.value === 'Update'))

const buttonDisability = computed(() => {
  return type?.value =='Add' ? (!field1.value && !field2.value ) : !(field2.value.name !== dataToUpdate?.value?.field2);
})

const onHide = () => {
  field1.value = null;
  field2.value = null;
};
const dataForGrouped = (data) => {
  const result = data.reduce((acc, item) => {
    const label = item.type || item.category;

    const existingCategory = acc.find(category => category.label === label);

    if (existingCategory) {
        existingCategory.items.push({...item, name: item.name, id: item.id });
    } else {
        acc.push({
            label: label,
            items: [{ ...item, name: item.name, id: item.id }]
        });
    }
    return acc;
}, []);
  return result;
}

watchEffect(() => {
  if (commonData?.value && !grouped.value) {
    reworkedData.value = commonData?.value?.map(obj => {
     return { ...obj, id: obj?.id, name: obj?.name}
   })
  } else if (commonData?.value && grouped.value) {
    reworkedData.value = dataForGrouped(commonData.value);
  }

  if (commonProficiency?.value) {
    reworkedProficiency.value = commonProficiency?.value?.map((el, idx) => {
     return {name: el.toString(), id: idx.toString()}
   })
  } 

  if (dataToUpdate?.value && type?.value === 'Update') {
    field1.value = reworkedData.value.find(el => el.name === dataToUpdate?.value?.field1)
    field2.value = reworkedProficiency.value.find(el => el.name == dataToUpdate?.value?.field2)
  }
  
})

watch(field1, (newVal) => {
  if (newVal && type?.value === 'Add') {
    field2.value = reworkedProficiency.value[0]
  }
})

  
</script>