<template>
  <DataTable :value="tableData" :autoLayout="true">
    <template v-for="(col, index) in columns" :key="index">
      <Column
        :field="col.field as string"
        :header="col.header"
        :sortable="col.sortable"
      >
        <template #body="slotProps">
          <div v-if="col.customBody">
            <component :is="col.customBody(slotProps.data)" />
          </div>
          <span v-else>{{ slotProps.data[col.field]}}</span>
        </template>
      </Column>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

interface ColumnConfig<T> {
  field: keyof T;
  header: string;
  sortable?: boolean;
  customBody?: (rowData: T) => any;
}

const props = defineProps<{
  tableData: Record<string, any>[];
  columns: ColumnConfig<Record<string, any>>[];
}>();

const { tableData, columns } = props;
</script>
