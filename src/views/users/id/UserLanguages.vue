<template>
  <div class="max-w-4xl flex flex-wrap justify-center mt-5 ml-auto mr-auto gap-4 px-6 ">
  <div class="min-w-56" v-for="el in currentUserLangList" :key="el.id">
    <Button variant="text" color="secondary" @click="(e) => invokeUpdateModal(e, el)" :disable="!enableEditMode"
      :class="{
        'chosen': arrayToDelete.includes(el)
      }">
      <div class="inline-flex gap-4">
      <div :class="{
        'blue': !arrayToDelete.includes(el) && el.proficiency.toLowerCase() === 'b1',
        'green': !arrayToDelete.includes(el) && el.proficiency.toLowerCase() === 'b2',
        'yellow': !arrayToDelete.includes(el) && (el.proficiency.toLowerCase() === 'c1'|| el.proficiency.toLowerCase() === 'c2'),
        'red': !arrayToDelete.includes(el) && el.proficiency.toLowerCase() === 'native',
      }
      ">{{el.proficiency}}</div>
      <div>{{ el.name }}</div>
      </div>
    </Button>
  </div>
</div>
  <ButtonBlock v-if="enableEditMode"  name="Language" @openAddModal="invokeAddModal" @addToDelete="handlerToDelete"  :deleteLength="arrayToDelete.length" @delete="deleteObj"/>
  <AddUpdateModal 
    name="Language" 
    :type="type" 
    :commonData="reworkedData" 
    :commonProficiency="langProficiency"
    :dataToUpdate="dataToUpdate"
    v-model="openModal"
    @cancel="cancel"
    @confirm="updateCreateLang"
    />
    <Toast />
</template>

<script setup lang="ts">
import ButtonBlock from '@/components/ui-kit/ButtonBlock.vue';
import Button from '@/components/ui-kit/Button.vue';
import AddUpdateModal from '@/components/ui-kit/AddUpdateModal.vue';
import { useLanguagesStore } from '@/stores/languages';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router';
import { useToastNotifications } from '@/composables/useToast'

const route = useRoute();

const { showError, showSuccessUpload, showProfileUpdate } =
  useToastNotifications()

const type = ref('Add')
const openModal = ref(false)

const addToDelete = ref(false)
const arrayToDelete = ref([])

const handlerToDelete = (value) => {
  addToDelete.value = value
  if (!value) arrayToDelete.value = []
}

const deleteObj = async () => {
  const newArr = arrayToDelete.value.map((el) => ({
    userId: currentUserId.value,
    name: el?.name
  }));

  let lastResponse = null;

  for (let idx = 0; idx < newArr.length; idx++) {
    const el = newArr[idx];
    try {
      lastResponse = await deleteProfileLanguage(el);
    } catch (error) {
      console.error(error);
      showError();
    }
  }

  if (lastResponse) {
    currentUserLangList.value = lastResponse.languages;
    showProfileUpdate('Succesfully deleted');
  }

  handlerToDelete(false);
};

const langStore = useLanguagesStore();
const { languages, langProficiency } = storeToRefs(langStore);
const {
    addProfileLanguage,
    updateProfileLanguage,
    deleteProfileLanguage
  } = langStore;

const userStore = useUserStore();
const { authedUser } = storeToRefs(userStore);

const currentUserId = computed(() => {
  let arr = route.path.split('/');
  return arr[arr.length - 2];
});

const enableEditMode = computed(() => authedUser?.value?.id == currentUserId?.value);

const currentUserLangList = ref();
const { getLangListByUserId } = langStore;

const updateCreateLang = async (data) => {
  try {
    const newObj = {
      userId: currentUserId.value,
      name: data.field1.value.name,
      proficiency: data.field2.value.name
    }
    let response
    if (type.value === 'Add') {
      response = await addProfileLanguage(newObj);
      if (response) showSuccessUpload('New Language was succesfully added')
    }  else {
      response = await updateProfileLanguage(newObj);
      if (response) showProfileUpdate('Data was succesfully updated')
    } 
    currentUserLangList.value = response.languages
  } catch (e) {
    console.log(e)
    showError()
  }
}

const dataToUpdate = ref({})

const invokeUpdateModal = (_, info) => {
  if (!addToDelete.value) {
    openModal.value = true;
    type.value = 'Update';
    dataToUpdate.value = {
      field1: info.name,
      field2: info.proficiency
    };
  } else {
    if (arrayToDelete.value.includes(info)) {
      arrayToDelete.value = arrayToDelete.value.filter(el => el !== info)
    } else {
      arrayToDelete.value.push(info)
    }
  }
}

const invokeAddModal = () => {
  dataToUpdate.value = {}
  openModal.value = true;
  type.value = 'Add';
}

const cancel = () => {
  openModal.value = false;
  dataToUpdate.value = {};
}

const updateReworkedData = () => {
  if (currentUserLangList?.value) {
    const arr = currentUserLangList?.value?.map(lang => lang.name)
    return type.value === 'Add' ? languages.value?.filter(lang => !arr.includes(lang.name)) : languages?.value
  } 
}

const reworkedData = computed(() => updateReworkedData())

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
.chosen {
  color: black !important;
}
</style>


