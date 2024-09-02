<script setup lang="ts">
import Form from '@/components/auth/Form.vue';

const obj = {
  title: 'Welcome Back',
  subtitle: 'Hello again! Sign in to continue.',
  action: 'Sign in',
  actionRedirect: "i don't have an account",
  link: '/auth/signup'
}
</script>

<template>
  <Form :obj="obj" />
</template>
