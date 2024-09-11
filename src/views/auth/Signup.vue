<script setup lang="ts">
import Form from '@/components/auth/Form.vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const obj = {
  title: t('signUpTitle'),
  subtitle: t('signUpSubtitle'),
  action: t('signUpAction'),
  actionRedirect: t('signUpRedirect'),
  link: '/auth/login'
}
</script>

<template>
  <Form :obj="obj" />
</template>
