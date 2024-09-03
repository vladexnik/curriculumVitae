<template>
  <Dialog v-model:visible="openDeleteConfirmation" modal :header="header" :style="{ width: '45rem' }">
  <p>Are you sure you want to {{ text }}</p>

  <div class="flex justify-end gap-5">
    <div class="w-[150px]">
      <Button variant="text" color="secondary" @click="reset">Cancel</Button>
    </div>
    <div class="w-[150px]">
      <Button variant="contained" color="primary" @click="remove">Confirm</Button>
    </div>
  </div>
</Dialog>
</template>

<script setup lang="ts">
import Button from '@/components/ui-kit/Button.vue';
import Dialog from 'primevue/dialog';
import { computed, toRefs } from 'vue';

const props = defineProps({
  type: String,
  name: String,
  openDeleteConfirmation: Boolean
})
const { type, name, openDeleteConfirmation } = toRefs(props)
const emit = defineEmits(['reset', 'remove'])
const reset = () => emit('reset')
const remove = () => emit('remove')

const header = computed(() => {
  let res;
    switch (type?.value) {
      case 'CV': 
        res = `Delete CV`;
        break;
      case 'Project':
        res = 'Remove Project';
        break;
    }
  return res;
})

const text = computed(() => {
  return header.value.toLowerCase() + name?.value;
})
</script>