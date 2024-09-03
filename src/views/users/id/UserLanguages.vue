<template>
  <div class="max-w-4xl flex flex-wrap justify-center mt-5 ml-auto mr-auto gap-4 px-6 ">
  <div class="min-w-56" v-for="el in currentUserLangList" :key="el.id">
    <Button variant="text" color="secondary" @click="(e) => invokeModal(e, el)" :disable="!enableEditMode">
      <div class="inline-flex gap-4">
      <div :class="{
        'blue': el.proficiency.toLowerCase() === 'b1',
        'green': el.proficiency.toLowerCase() === 'b2',
        'yellow': el.proficiency.toLowerCase() === 'c1'|| el.proficiency.toLowerCase() === 'c2',
        'red': el.proficiency.toLowerCase() === 'native',
      }
      ">{{el.proficiency}}</div>
      <div>{{ el.name }}</div>
      </div>
    </Button>
  </div>

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
import Button from '@/components/ui-kit/Button.vue';
import AddUpdateModal from '@/components/ui-kit/AddUpdateModal.vue';
import { useLanguagesStore } from '@/stores/languages';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();

// enum Type {
//   Add,
//   Update
// }
const type = ref('Add')
const openModal = ref(false)

const langStore = useLanguagesStore();
const { languages, langProficiency } = storeToRefs(langStore);

const userStore = useUserStore();
const { authedUser } = storeToRefs(userStore);

const currentUserId = computed(() => {
  let arr = route.path.split('/');
  return arr[arr.length - 2];
});

const enableEditMode = computed(() => authedUser.value.id == currentUserId.value);

const currentUserLangList = ref();
const { getLangListByUserId } = langStore;

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

const invokeModal = (_, info) => {
  openModal.value = true;
  type.value = 'Update';
  dataToUpdate.value = {
    field1: { name: info.name},
    field2: { name: info.proficiency},
  }
}

onMounted(async () => {
  const data = await getLangListByUserId(currentUserId.value);
  currentUserLangList.value = data;
})
</script>

<style scoped>
.blue {
  color: rgb(2, 136, 209);
}
.green {
  color: rgb(46, 125, 50);
}
.yellow {
  color: rgb(255, 184, 0);
}
.red {
  color: rgb(198, 48, 49);
}
</style>


