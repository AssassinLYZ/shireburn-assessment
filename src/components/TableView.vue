<script setup lang="ts">
import { ref, type Ref, watch, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { tableStore } from '@/store/tableStore';

const tableDataStore = tableStore();
const {
    employeeList,
} = storeToRefs(tableDataStore);

onMounted(async () => {
    await tableDataStore
        .fetchAllEmployees() 
        .then(() => tableDataStore.setLoadListOnce())
});
</script>

<template>
  <div>

    <p>{{ employeeList }}</p>
    
  </div>
</template>