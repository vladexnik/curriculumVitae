<template>
  <Dialog v-model:visible="visible" modal :header="header" :style="{ width: '45rem' }">
    <p>Are you sure you want to {{ text }}</p>

    <div class="flex justify-end gap-5">
      <div class="w-[150px]">
        <Button variant="text" color="secondary" @click="cancel">{{$t('cancel')}}</Button>
      </div>
      <div class="w-[150px]">
        <Button variant="contained" color="primary" @click="confirm">{{$t('confirm')}}</Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import Button from '@/components/ui-kit/Button.vue';
import Dialog from 'primevue/dialog';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  type: String,
  name: String,
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'reset', 'remove']);

const { type, name, modelValue } = toRefs(props);

const visible = computed({
  get: () => modelValue.value,
  set: (value) => emit('update:modelValue', value)
});

const cancel = () => {
  emit('reset');
  visible.value = false;
};

const confirm = () => {
  emit('remove');
  visible.value = false;
};

const header = computed(() => {
  return type?.value === 'CV' ? 'Delete CV' : 'Remove Project';
});

const text = computed(() => {
  return header.value.toLowerCase() + ' ' + name?.value;
});
</script>
