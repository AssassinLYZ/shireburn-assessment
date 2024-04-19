<script setup lang="ts">
import { ref, type Ref, watch, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { tableStore } from '@/store/tableStore'

// ---
const tableDataStore = tableStore()
const {
  loadListOnce,
  employeeList,
  filterEmployeeList,
  displayedEmployeeList,
  filterInput,
  tableHeight,
  rowHeight,
  currentPage,
  numberOfRows,
  numberOfPages
} = storeToRefs(tableDataStore)

const refWrapperTable: Ref<HTMLDivElement | null> = ref(null)

// ---
onMounted(async () => {
  tableDataStore.setUnseletectedEmployee()

  if (!loadListOnce.value) {
    await tableDataStore
      .fetchAllEmployees()
      .then(() => tableDataStore.setLoadListOnce())
      .finally(() => getTableHeight())
  } else {
    tableDataStore.refreshDataTable()
  }
  window.addEventListener('resize', getTableHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', getTableHeight)
})

watch(
  filterInput,
  (newValue, oldValue) => {
    if (newValue !== '') {
      filterEmployeeList.value = employeeList.value.filter((data) =>
        `${data.Occupation}`.toLowerCase().includes(`${newValue.toLowerCase()}`)
      )
    } else {
      filterEmployeeList.value = []
    }
  },
  { deep: true }
)

watch(
  [tableHeight, filterInput],
  ([newHeight, newFilterInput], [oldHeight, oldFilterInput]) => {
    numberOfRows.value = Math.floor(newHeight / rowHeight.value) - 1
    numberOfPages.value = Math.ceil(
      newFilterInput === ''
        ? employeeList.value.length / numberOfRows.value
        : filterEmployeeList.value.length / numberOfRows.value
    )
  },
  { deep: true }
)

watch(
  [() => numberOfRows.value, () => numberOfPages, filterInput],
  ([newRowsNumber, newPagesNumber, newFilterInput]) => {
    currentPage.value = 1

    displayedEmployeeList.value = (
      newFilterInput === '' ? employeeList.value : filterEmployeeList.value
    ).slice(
      currentPage.value === 1 ? 0 : (currentPage.value - 1) * newRowsNumber,
      currentPage.value === 1 ? newRowsNumber : currentPage.value * newRowsNumber
    )
    console.log(employeeList.value, displayedEmployeeList.value)
  }
)

watch([() => currentPage.value, filterInput], ([newCurrentPage, newFilterInput]) => {
  displayedEmployeeList.value = (
    newFilterInput === '' ? employeeList.value : filterEmployeeList.value
  ).slice(
    newCurrentPage === 1 ? 0 : (newCurrentPage - 1) * numberOfRows.value,
    newCurrentPage === 1 ? numberOfRows.value : newCurrentPage * numberOfRows.value
  )
})

const getTableHeight: any = () => {
  console.log(refWrapperTable.value?.children[1].clientHeight)
  tableHeight.value = refWrapperTable.value?.children[1].clientHeight as number
}
</script>

<template>
  <section ref="refWrapperTable" class="section-card">
    <slot name="tableFilters"></slot>
    <slot name="tableEmployees"></slot>
  </section>
  <slot name="tablePagination"></slot>
</template>

<style scoped>
.section-card {
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 30px 20px;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 0px 15px -10px rgba(66, 68, 90, 1);
  box-shadow: 0px 0px 15px -10px rgba(66, 68, 90, 1);
  height: calc(100vh - 260px);
  min-height: 223px;
}
@media (max-width: 350px) {
  .section-card {
    min-height: 308px;
  }
}
</style>
