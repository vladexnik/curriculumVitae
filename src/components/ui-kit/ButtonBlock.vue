<template>
  <div class="w-full flex justify-end gap-4 pr-24 mt-10">
    <Button class="max-w-56" variant="text" color="secondary" @click="firstButtonAction">
      <i :class="firstIcon" class="mr-2"></i>
      {{ firstButton }}
    </Button>
    <Button class="max-w-56 border-0" variant="outlined" color="primary" @click="secButtonAction" :disabled="changeToRemove && !deleteLength">
      <i :class="secIcon" class="mr-2"></i>
      {{ secButton }}
    </Button>
  </div>
</template>

<script setup lang="js">
import { PrimeIcons } from '@primevue/core/api';
import { computed, ref, toRefs } from 'vue';
import Button from './Button.vue';

const props = defineProps({
  name: String,
  deleteLength: Number
});

const emit = defineEmits(['openAddModal', 'addToDelete', 'delete'])

const { name, deleteLength } = toRefs(props);
const changeToRemove = ref(false);

const firstIcon = computed(() => {
  return changeToRemove.value ? '' : PrimeIcons.PLUS;
});

const firstButton = computed(() => {
  return changeToRemove.value ? 'CANCEL' : `ADD ${name.value.toUpperCase()}`;
});

const secIcon = computed(() => {
  return changeToRemove.value ? '' : PrimeIcons.TRASH;
});

const secButton = computed(() => {
  return changeToRemove.value ? 'DELETE ' + (deleteLength.value ? deleteLength.value : '') : `REMOVE ${name.value.toUpperCase()}S`;
});

const firstButtonAction = () => {
  if (changeToRemove.value) {
    changeToRemove.value = false
    emit('addToDelete', false)
  } else {
    emit('openAddModal')
  }
}

const secButtonAction = () => {
    if (deleteLength.value) {
      emit('delete')
      changeToRemove.value = false
    } else {
      changeToRemove.value = true
      emit('addToDelete', true)
    }
}
</script>
