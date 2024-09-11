<script setup lang="ts">
import Form from '@/components/auth/Form.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const obj = {
  title: t('loginTitle'),
  subtitle: t('loginSubtitle'),
  action: t('loginAction'),
  actionRedirect: t('loginRedirect'),
  link: '/auth/signup'
}
</script>

<template>
  <Form :obj="obj" />
</template>
