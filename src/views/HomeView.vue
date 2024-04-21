<script setup lang="ts">
import TableView from '@/components/TableView.vue'
import TableFilters from '@/components/TableFilters.vue'
import TableEmployees from '@/components/TableEmployees.vue'
import TablePagination from '@/components/TablePagination.vue'
</script>

<template>
  <main>
    <TableView>
      <template #tableFilters>
        <TableFilters />
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
