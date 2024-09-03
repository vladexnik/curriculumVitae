<template>
  <div class="about">
    <h1>{{
      langProficiency}}</h1>
  </div>
  <AddUpdateModal 
    name="Language" 
    :type="type" 
    :commonData="languages" 
    :commonProficiency="langProficiency"
    :dataToUpdate="dataToUpdate"
    v-model="openModal"
    @cancel="() => (openModal = false)"
    @confirm="updateCreateLang"
    />
</template>

<script setup lang="ts">
import AddUpdateModal from '@/components/AddUpdateModal.vue';
import { useLanguagesStore } from '@/stores/languages';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue'

// enum Type {
//   Add,
//   Update
// }
const type = ref('Add')
const openModal = ref(true)

const langStore = useLanguagesStore();
const { languages, langProficiency } = storeToRefs(langStore);

const updateCreateLang = (data) => {
  console.log("lang", type.value, data)
}

const dataToUpdate = computed(() => {
  const obj = {
    field1: {
      id: "3",
      name: "German"
    },
    field2: {  id: "2", name: "B1" }
  }
  return obj;
})

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>


