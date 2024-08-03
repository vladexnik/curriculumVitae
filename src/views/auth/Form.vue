<template>
  <form
    @submit.prevent="handleAuth"
    class="flex h-[calc(100%-66px)] flex-col items-center justify-center"
  >
    <p class="mb-6 text-3xl">{{ obj.title }}</p>
    <p class="mb-10">{{ obj.subtitle }}</p>
    <div class="flex w-[90%] max-w-[560px] flex-col gap-4">
      <TextField
        ref="emailField"
        type="text"
        v-model="auth.email"
        :error="
          v$.email.$errors[0]?.$message ||
          errorMessage.email ||
          errorMessage.password
        "
        autocomplete="email"
      >
        Email
      </TextField>
      <TextField
        ref="passwordField"
        type="password"
        v-model="auth.password"
        :error="v$.password.$errors[0]?.$message || errorMessage.password"
        autocomplete="current-password"
      >
        Password
      </TextField>
    </div>
    <div class="mt-[60px] flex w-[220px] flex-col gap-2">
      <Button variant="contained" color="primary" type="submit">
        {{ obj.action }}
      </Button>
      <Button
        variant="text"
        color="primary"
        type="submit"
        @click.prevent="$router.push(obj.link)"
      >
        {{ obj.actionRedirect }}
      </Button>
    </div>
  </form>
</template>
<script setup lang="ts">
import TextField from '@/components/ui-kit/TextField.vue'
import Button from '@/components/ui-kit/Button.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import {
  REQUIRED_FIELD,
  INVALID_EMAIL
} from '@/components/ui-kit/constants/constants'
import { showErrorAfterSubmit } from '@/components/ui-kit/constants/constants'
import type { ApolloError } from '@apollo/client'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const { authedUser, accessToken } = storeToRefs(userStore)
const { login, signup } = userStore

const auth = reactive({
  email: '',
  password: ''
})

const errorMessage = reactive({
  email: '',
  password: ''
})

const emailField = ref<HTMLInputElement | null>(null)
const passwordField = ref<HTMLInputElement | null>(null)

defineProps<{
  obj: {
    title: string
    subtitle: string
    action: string
    actionRedirect: string
    link: string
  }
}>()

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(REQUIRED_FIELD, required),
      minLength: minLength(5),
      email: helpers.withMessage(INVALID_EMAIL, email)
    },
    password: {
      required: helpers.withMessage(REQUIRED_FIELD, required),
      minLength: minLength(5)
    }
  }
})

const v$ = useVuelidate(rules, auth)

onMounted(() => {
  emailField.value?.focus()
})

async function handleAuth() {
  // accessToken.value = ''
  try {
    const result = await v$.value.$validate()

    if (!result) {
      const emailError = v$.value.email.$errors[0]
      if (emailError) {
        emailField.value?.focus()
      } else {
        passwordField.value?.focus()
      }
    }

    if (result) {
      route.path === '/auth/login' ? await login(auth) : await signup(auth)
    }
  } catch (err: unknown) {
    const error = err as ApolloError
    showErrorAfterSubmit(error, errorMessage, emailField)
  } finally {
    if (accessToken.value) router.push({ path: '/' })
  }
}
</script>
