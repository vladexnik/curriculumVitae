<template>
  <form class="flex h-[calc(100%-66px)] flex-col items-center justify-center">
    <p class="mb-6 text-3xl">{{ obj.title }}</p>
    <p class="mb-10">{{ obj.subtitle }}</p>
    <div class="flex w-[90%] max-w-[560px] flex-col gap-4">
      <TextField type="text" v-model="formData.email" autocomplete="email"
        >Email</TextField
      >
      <TextField
        type="password"
        v-model="formData.password"
        autocomplete="current-password"
      >
        Password
      </TextField>
    </div>
    <div class="mt-[60px] flex w-[220px] flex-col gap-2">
      <Button
        variant="contained"
        color="primary"
        type="submit"
        @click.prevent="console.log('1')"
        >{{ obj.action }}</Button
      >
      <Button
        variant="text"
        color="primary"
        type="submit"
        @click.prevent="$router.push(obj.link)"
        >{{ obj.actionRedirect }}</Button
      >
    </div>
  </form>
</template>
<script setup lang="ts">
import TextField from '@/components/ui-kit/TextField.vue'
import Button from '@/components/ui-kit/Button.vue'
import { reactive } from 'vue'

defineProps<{
  obj: {
    title: string
    subtitle: string
    action: string
    actionRedirect: string
    link: string
  }
}>()

const formData = reactive({
  email: '',
  password: ''
})
</script>
