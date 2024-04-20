<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { tableStore } from '@/store/tableStore'
import useValidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import type Employee from '@/interfaces/Employee'

import VueDatePicker from './DatePicker.vue'

const tableDataStore = tableStore()
const { employeeList, employee } = storeToRefs(tableDataStore)

const state = reactive<Partial<Employee>>({
  FirstName: employee?.value?.FirstName || '',
  LastName: employee?.value?.LastName || '',
  Id: employee?.value?.Id || '',
  Gender: employee?.value?.Gender || '',
  Occupation: employee?.value?.Occupation || '',
  DateOfBirth: employee?.value?.DateOfBirth || '',
  EmploymentDate: employee?.value?.EmploymentDate || '',
  TerminationDate: employee?.value?.TerminationDate || ''
})

const rules = reactive({
  firstName: { required, minLength: minLength(3) },
  lastName: { required, minLength: minLength(3) }
})

// const v$ = useValidate(rules, state)
// const refImageInput = ref<HTMLInputElement | null>(null)

onMounted(() => {})

const submitForm = (e: Event) => {
  e.preventDefault()
}
</script>

<template>
  <form class="section-wrapper" @submit.prevent="submitForm">
    <section class="section-card section-card-left">
      <div class="employee-details">
        <div class="group">
          <label for="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            :placeholder="`${state.FirstName}...`"
            v-model="state.FirstName"
          />
        </div>

        <div>
          <label for="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            :placeholder="`${state.FirstName}...`"
            v-model="state.LastName"
          />
        </div>

        <div>
          <label for="last-name">Occupation</label>
          <select v-model="state.Occupation">
            <option value="HR Manager">HR Manager</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label for="gender">Gender</label>
          <select v-model="state.Gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label for="date-of-birth">Date Of Birth</label>
          <VueDatePicker
            placeholder="choose Date of Birth"
            v-model="state.DateOfBirth"
            format="yyyy-MM-dd"
            modelType="timestamp"
          />
        </div>
        <div>
          <label for="employment-date">EmploymentDate</label>

          <VueDatePicker
            placeholder="choose EmploymentDate"
            v-model="state.EmploymentDate"
            format="yyyy-MM-dd"
            modelType="timestamp"
          />
        </div>
        <div>
          <label for="last-name">TerminationDate</label>
          <VueDatePicker
            placeholder="choose TerminationDate"
            v-model="state.TerminationDate"
            format="yyyy-MM-dd"
            modelType="timestamp"
          />
        </div>
      </div>
      <div class="button">
        <button class="button-update" type="submit">Update Details</button>
      </div>
    </section>
  </form>
</template>

<style scoped>
.section-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  grid-auto-flow: row;
  width: 100%;
}
.section-card {
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 0px 15px -10px rgba(66, 68, 90, 1);
  box-shadow: 0px 0px 15px -10px rgba(66, 68, 90, 1);
  height: 600px;
  row-gap: 40px;
  grid-template-rows: 1fr 35px;
}
label {
  font-size: 13px;
  font-weight: bold;
  margin: 0;
  padding: 0;
  display: block;
  width: 100%;
}
input {
  margin: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 2px 10px;
  border: 1px solid #b4b4b4;
  border-radius: 3px;
  color: #747474;
  outline: none;
  background-color: transparent;
}
span {
  font-size: 12px;
  margin-left: 10px;
  padding: 0;
  color: tomato;
}
.employee-details {
  display: grid;
  gap: 0 30px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1;
  width: 80%;
  margin: 30px auto;
  height: 450px;
}

.email {
  grid-column: 1 / 2;
}
.employee-photo {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.section-card button {
  height: 30px;
  width: 100%;
  background-color: transparent;
  height: 35px;
  line-height: 35px;
  border-radius: 10px;
  transition: all 0.3s;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
}
.button {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
button.button-update {
  background-color: hsla(160, 100%, 37%, 1);
  color: #fff;
  width: 130px;
  padding: 0 10px;
  font-weight: 600;
}
button.button-update:hover {
  background-color: hsla(160, 100%, 37%, 0.75);
}

@media (max-width: 724px) {
  .section-card {
    height: 780px;
  }
  .employee-details {
    height: 620px;
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr 1fr 1fr;
  }
}
</style>
