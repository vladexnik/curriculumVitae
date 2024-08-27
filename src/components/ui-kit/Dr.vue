<template>
  <div class="custom-table-wrapper">
    <DataTable :value="tableData" :autoLayout="true" class="custom-datatable">
      <template v-for="(col, index) in columns" :key="index">
        <Column :field="col.field" :header="col.header" :sortable="col.sortable">
          <template #body="slotProps">
            <div v-if="col.customBody">
              <component :is="col.customBody(slotProps.data)" />
            </div>
            <span v-else>{{ slotProps.data[col.field] }}</span>
            <template v-if="index === 0">
              <div :colspan="columns.length" class="project-description-cell">
                <div class="project-description">
                  {{ slotProps.data.description ? slotProps.data.description : '' }}
                  {{ slotProps.data.environment ?  slotProps.data.environment : ''}}
                </div>
              </div>
            </template>
            <template v-else>
              <div :colspan="columns.length" class="project-description-cell"></div>
            </template>
          </template>
        </Column>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

interface Project {
  id: number;
  name: string;
  domain: string;
  startDate: string;
  endDate: string;
  description: string;
  environment: string[];
}

const tableData = ref<Project[]>([
  {
    id: 0,
    name: "Banking App",
    domain: "Fintech",
    startDate: "27/06/2017",
    endDate: "10/08/2020",
    description:
      "Mobile app for business where you can access your bank account's details and complete transactions directly from your phone, tablet, or mobile device.",
    environment: ["JavaScript", "TypeScript", "React"],
  },
  {
    id: 1,
    name: "Business Process Automation",
    domain: "Automation",
    startDate: "23/01/2023",
    endDate: "Till now",
    description:
      "A system for setting up business process automation. Includes work with webhooks, queries to third-party services and databases, mailing of letters, sms notifications and much more...",
    environment: ["JavaScript", "TypeScript", "React"],
  },
]);

const columns = ref([
  { field: 'name', header: 'Name', sortable: true },
  { field: 'domain', header: 'Domain', sortable: true },
  { field: 'startDate', header: 'Start Date', sortable: true },
  { field: 'endDate', header: 'End Date', sortable: true },
]);
</script>

<style>
.project-description-cell {
  margin-top: 15px;
  position: static;
  height: 100px;
}

.project-description {
  @apply text-textSec;
  position: absolute;
  width: 100%;
  margin-bottom: 10px;
  font-size: 1rem;
}

</style>
