<script setup lang="ts">
import Button from './ui-kit/Button.vue'
import PasswordInput from './ui-kit/PasswordInput.vue'
import TextField from './ui-kit/TextField.vue'
import SearchInput from './ui-kit/SearchInput.vue'

const handleOnSubmit = () => {
  console.log('submit')
}
</script>

<template>
  <div class="w-[500px] m-4">
    <SearchInput />
  </div>

  <form
    @submit.prevent="handleOnSubmit"
    class="d-flex w-[500px] 1max-w-full m-4 gap-4"
  >
    <Button variant="contained" color="secondary">sign in</Button>
    <Button variant="outlined" color="secondary">Outlined Secondary</Button>
    <Button variant="text" color="secondary">Text Primary</Button>

    <TextField required>Email</TextField>
    <TextField required>Name</TextField>
    <PasswordInput />

    <Button
      type="submit"
      variant="contained"
      color="primary"
      class="p-2 border my-5"
      >Submit</Button
    >
  </form>
</template>
