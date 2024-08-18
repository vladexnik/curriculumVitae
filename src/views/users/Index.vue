<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <Table :tableData="data" :columns="columnsConfig" />
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/ui-kit/Table.vue';
import LibButton from 'primevue/button'
import Avatar from 'primevue/avatar'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { useUsersListStore } from '@/stores/usersList'
import { ref, h, watchEffect } from 'vue';

const usersStore = useUsersListStore()
const { users } = storeToRefs(usersStore)
const router = useRouter()

interface DataRow {
  id: string,
  img: string,
  firstName: string,
  lastName: string,
  email: string,
  department: string,
  position: string,
  actionButton: string
}

const data = ref<DataRow[]>();
  const columnsConfig = ref([
  { field: 'img', header: '', sortable: false,
  customBody: (rowData: DataRow) => {
      const obj = {
        class: 'custom-avatar', 
        style: { backgroundColor: '#ece9fc', color: '#2a1261' },
        shape: 'circle',
        size: 'large'
      };
      if (rowData.img) {
        obj['image'] = rowData.img;
      } else {
        obj['icon'] = "pi pi-user";
      }
      return h(Avatar, obj);
    }
   },
  { field: 'firstName', header: 'First Name', sortable: false },
  { field: 'lastName', header: 'Last Name', sortable: false },
  { field: 'email', header: 'Email', sortable: false },
  { field: 'department', header: 'Department', sortable: true },
  { field: 'position', header: 'Position', sortable: false },
  { field: 'actionButton', header: '', sortable: false,
    customBody: (rowData: DataRow) => {
      return h('div', [
        h(LibButton, {
          icon: 'pi pi-chevron-right',
          iconPos: 'right',
          class: 'p-button-text p-button-secondary custom-button',
          style: { color: '#64748b', borderColor: 'transparent', },
          rounded: true,
          onClick: () => router.push(`/users/${rowData.id}`)
        })
      ]);
    }
  }
]);

watchEffect(() => {
  data.value = users.value;
})
</script>
<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
