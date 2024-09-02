<script setup lang="ts">
import Form from '@/components/auth/Form.vue'

const obj = {
  title: 'Register Now',
  subtitle: 'Welcome! Sign up to continue.',
  action: 'Sign up',
  actionRedirect: 'i have an account',
  link: '/auth/login'
}
</script>

<template>
  <Form :obj="obj" />
</template>
