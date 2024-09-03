<template>
  <DataTable :value="props.tableData" :autoLayout="true" :key="uniqueKey">
    <template v-for="(col, index) in props.columns" :key="index">
      <Column
        :field="col.field as string"
        :header="col.header"
        :sortable="col.sortable"
      >
        <template #body="slotProps">
          <div v-if="col.customBody">
            <component :is="col.customBody(slotProps.data)" />
          </div>
          <span v-else>{{ slotProps.data[col.field] }}</span>
          <template v-if="index === 0 && slotProps.data.description">
            <div :colspan="columns.length" class="project-description-cell">
              <div class="project-description">
                <div class="block">
                  {{
                    slotProps.data.description ? slotProps.data.description : ''
                  }}
                </div>
                <div class="m-4 inline-flex gap-4">
                  <div
                    class="rounded-[40px] border-2 border-slate-200 p-1"
                    v-for="(env, idx) in slotProps.data.environment"
                    :key="idx"
                  >
                    {{ env }}
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else-if="slotProps.data.description">
            <div
              :colspan="columns.length"
              class="project-description-cell"
            ></div>
          </template>
        </template>
      </Column>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

interface ColumnConfig<T> {
  field: keyof T
  header: string
  sortable?: boolean
  customBody?: (rowData: T) => any
}

const props = defineProps<{
  tableData: Record<string, any>[]
  columns: ColumnConfig<Record<string, any>>[]
}>()

const uniqueKey = computed(() => props.tableData.length)
</script>

<style scoped>
:deep(.p-datatable-tbody > tr > td), :deep(.p-datatable-thead > tr > th) {
  @apply bg-bgColor text-textSec;
}
.project-description-cell {
  margin-top: 15px;
  margin-bottom: 15px;
  position: static;
}

.project-description {
  @apply text-textSec;
  position: absolute;
  width: 100%;
  margin-bottom: 10px;
  font-size: 1rem;
}
</style>
