<template>
  <div
    class="flex h-10 items-center rounded-[40px] border border-lightGrey text-sm font-medium focus-within:border-primary hover:border-textMain hover:focus-within:border-primary"
  >
    <div class="pl-3">
      <i class="pi pi-search text-textMain" style="font-size: 1rem"></i>
    </div>
    <input
      type="text"
      class="box-border w-full bg-transparent py-[6px] pl-3 text-textMain focus:outline-none"
      placeholder="Search"
      v-model="modelInput"
    />
    <i
      v-if="modelInput"
      class="pi pi-times mr-1 cursor-pointer rounded-2xl p-2 text-textMain duration-300 hover:bg-optionHover"
      style="font-size: 1rem"
      v-ripple
      @click="clearInput"
    ></i>
  </div>
</template>
<script setup>
const modelInput = defineModel({ type: String })

const clearInput = () => {
  modelInput.value = ''
}
</script>
<style scoped>
::placeholder {
  @apply text-textSec;
}
</style>
