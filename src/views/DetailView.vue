<script setup lang="ts">
import TheEmployee from '@/components/TheEmployee.vue'
import { tableStore } from '@/store/tableStore'
import { storeToRefs } from 'pinia'

const tableDataStore = tableStore()
const { employee } = storeToRefs(tableDataStore)
</script>

<template>
  <div class="about">
    <header class="header">
      <h1>{{ employee ? `Edit Employee -- Id:${employee.Id}` : 'Add Employee' }} <span> </span></h1>
    </header>
    <TheEmployee />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    justify-content: center;
    width: 100%;
    /* min-height: 100vh; */
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
.header h1 {
  color: var(--color-theme);
  margin-bottom: 30px;
  font-weight: 800;
}
</style>
