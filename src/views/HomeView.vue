<script setup lang="ts">
import { ref, type Ref } from 'vue'
import TableView from '@/components/TableView.vue'
import TableFilters from '@/components/TableFilters.vue'
import TableEmployees from '@/components/TableEmployees.vue'
import TablePagination from '@/components/TablePagination.vue'

const placeHolder: Ref<string> = ref('Search by Occupation ...')
const buttonName: Ref<string> = ref('Add User')
</script>

<template>
  <main>
    <TableView>
      <template #tableFilters>
        <TableFilters :placeHolder="placeHolder" :buttonName="buttonName" />
      </template>
      <template #tableEmployees>
        <TableEmployees />
      </template>
      <template #tablePagination>
        <TablePagination />
      </template>
    </TableView>
  </main>
</template>
