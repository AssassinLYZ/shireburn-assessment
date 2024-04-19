<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { storeToRefs } from 'pinia'
import { tableStore } from '@/store/tableStore'
import router from '@/router'

const tableDataStore = tableStore()
const { employeeList, displayedEmployeeList } = storeToRefs(tableDataStore)

const selectEmployee = (id: string): any => {
  tableDataStore.setSeletectedEmployee(id)
  router.push('/edit-employee')
}
</script>

<template>
  <section ref="refWrapperTable" class="wrapper-table">
    <table class="custom-table">
      <thead>
        <tr>
          <th></th>
          <th>Full Name</th>
          <th>Gender</th>
          <th>Occupation</th>
          <th>DateOfBirth</th>
          <th>EmploymentDate</th>
          <th>TerminationDate</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="displayedEmployeeList?.length !== 0">
        <tr v-for="employee in displayedEmployeeList" :key="employee.Id">
          <td>{{ employee.Id }}</td>
          <td>{{ `${employee.FirstName} ${employee.LastName}` }}</td>
          <td>{{ employee.Gender }}</td>
          <td>{{ employee.Occupation }}</td>
          <td>{{ employee.DateOfBirth }}</td>
          <td>{{ employee.EmploymentDate }}</td>
          <td>{{ employee.TerminationDate }}</td>
          <td>
            <div class="actions">
              <button @click="selectEmployee(employee.Id)">
                <i>Select</i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td :colspan="8">
            <LoadingSpinner />
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.wrapper-table {
  min-height: 101px;
  max-height: calc(100vh - 370px);
  height: 100%;
  overflow-y: hidden;
}
table.custom-table {
  background-color: #fff;
  width: 100%;
  /* text-align: left; */
  border-collapse: collapse;
  border-spacing: 10px;
  margin-top: 5px;
}
table.custom-table thead {
  background: #fff;
}
table.custom-table thead th {
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  color: #444;
  text-align: left;
  height: 40px;
  padding: 0 20px;
}

table.custom-table tbody td {
  padding: 0 20px;
  white-space: nowrap;
  font-size: 13px;
  height: 50px;
}
table.custom-table tbody td:first-child {
  text-align: center;
}
table.custom-table tbody tr:hover,
table.custom-table tbody tr:focus {
  background-color: hsla(160, 100%, 37%, 0.2) !important;
}
table.custom-table tbody tr:nth-child(odd) {
  background: var(--color-background-grey);
}
table.custom-table tbody tr td:first-child {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
table.custom-table tbody tr td:last-child {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
@media (max-width: 680px) {
}
@media (max-width: 350px) {
  .wrapper-table {
    min-height: 181px;
    max-height: calc(100vh - 415px);
  }
}

.actions button {
  border: none;
  height: 15px;
  width: 15px;
  background-color: transparent;
  line-height: 24px;
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  margin-right: 8px;
  padding: 0;
  outline: none;
  display: block;
  float: left;
  cursor: pointer;
}
</style>
