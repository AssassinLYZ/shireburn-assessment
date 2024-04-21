<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { tableStore } from '@/store/tableStore'
import useValidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import type Employee from '@/interfaces/Employee'
import router from '@/router'
import { getStatus, getStatusClass } from '@/lib/utils/compareDates'
import VueDatePicker from './DatePicker.vue'

const tableDataStore = tableStore()
const { employeeList, employee } = storeToRefs(tableDataStore)

const status = ref('show')
const isShowhint = ref(false)

const state = reactive<Employee>({
  FirstName: employee?.value?.FirstName || '',
  LastName: employee?.value?.LastName || '',
  Id: employee?.value?.Id || '',
  Gender: employee?.value?.Gender || '',
  Occupation: employee?.value?.Occupation || '',
  DateOfBirth: employee?.value?.DateOfBirth || '',
  EmploymentDate: employee?.value?.EmploymentDate || '',
  TerminationDate: employee?.value?.TerminationDate || ''
})

onMounted(() => {
  if (!employee.value) router.push('/')
})

const mustBigger = () => {
  if (!state.TerminationDate || !state.EmploymentDate) return true
  if (new Date(state.TerminationDate).getTime() < new Date(state.EmploymentDate).getTime())
    return false
  return true
}
const rules = {
  FirstName: { required, minLength: minLength(3) },
  LastName: { required, minLength: minLength(3) },
  EmploymentDate: {},
  TerminationDate: {
    mustBigger: helpers.withMessage('TerminationDate Must after EmploymentDate', mustBigger)
  }
}

const v$ = useValidate(rules, state)

const submitForm = async (e: Event) => {
  e.preventDefault()
  const result = await v$.value.$validate()
  if (result) {
    const _employee: Employee = {
      Id: state.Id,
      FirstName: state.FirstName,
      LastName: state.LastName,
      Gender: state.Gender || '',
      Occupation: state.Occupation || '',
      DateOfBirth: state.DateOfBirth || '',
      EmploymentDate: state.EmploymentDate || '',
      TerminationDate: state.TerminationDate || ''
    }
    let index: number | null = null
    employeeList.value.find((employee, i) => {
      return employee.Id === _employee.Id && (index = i)
    })
    index !== null && (employeeList.value[index] = _employee)
    status.value = 'show'

    isShowhint.value = true

    setTimeout(() => {
      isShowhint.value = false
    }, 2000)
  } else {
    return
  }
}

const changeStatus = (e: Event) => {
  e.preventDefault()
  status.value = 'edit'
}
</script>

<template>
  <form class="section-wrapper" @submit.prevent="submitForm">
    <section class="section-card section-card-left">
      <div class="employee-details">
        <div class="group">
          <label for="FirstName">First Name</label>
          <!-- <input
            v-if="status == 'edit'"
            type="text"
            id="first-name"
            :placeholder="`${state.FirstName}...`"
            v-model="state.FirstName"
          />
          <span v-if="v$.FirstName.$error && status == 'edit'">
            {{ v$.FirstName.$errors[0].$message }}</span
          > -->
          <p class="employee-attr">{{ state.FirstName }}</p>
        </div>

        <div class="group">
          <label for="last-name">Last Name</label>
          <!-- <input
            v-if="status == 'edit'"
            disabled
            type="text"
            id="last-name"
            :placeholder="`${state.LastName}...`"
            v-model="state.LastName"
          /> -->
          <!-- <span v-if="v$.LastName.$error && status == 'edit'">
            {{ v$.LastName.$errors[0].$message }}</span
          > -->
          <p class="employee-attr">{{ state.LastName }}</p>
        </div>

        <div>
          <label for="last-name">Occupation</label>
          <!-- <select v-model="state.Occupation" disabled v-if="status == 'edit'">
            <option value="HR Manager">HR Manager</option>
            <option value="Female">Female</option>
          </select> -->
          <p class="employee-attr">{{ state.Occupation }}</p>
        </div>

        <div>
          <label for="gender">Gender</label>
          <!-- <select v-model="state.Gender" v-if="status == 'edit'">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select> -->
          <p class="employee-attr">{{ state.Gender }}</p>
        </div>

        <div>
          <label for="date-of-birth">Date Of Birth</label>
          <!-- <VueDatePicker
            v-if="status == 'edit'"
            placeholder="choose Date of Birth"
            v-model="state.DateOfBirth"
            format="yyyy-MM-dd"
            modelType="format"
          /> -->
          <p class="employee-attr">{{ state.DateOfBirth }}</p>
        </div>

        <div>
          <label>Status</label>
          <p
            :class="
              getStatusClass(getStatus(state.EmploymentDate, state.TerminationDate)) +
              ' employee-attr'
            "
          >
            {{ getStatus(state.EmploymentDate, state.TerminationDate) }}
          </p>
        </div>
        <div>
          <label for="employment-date">EmploymentDate</label>

          <VueDatePicker
            v-if="status == 'edit'"
            placeholder="choose EmploymentDate"
            v-model="state.EmploymentDate"
            format="yyyy-MM-dd"
            modelType="format"
          />
          <p class="employee-attr" v-if="status == 'show'">{{ state.EmploymentDate }}</p>
        </div>
        <div class="group">
          <label for="last-name">TerminationDate</label>
          <VueDatePicker
            v-if="status == 'edit'"
            placeholder="choose TerminationDate"
            v-model="state.TerminationDate"
            format="yyyy-MM-dd"
            modelType="format"
          />
          <span v-if="v$.TerminationDate.$error && status == 'edit'">
            {{ v$.TerminationDate.$errors[0].$message }}</span
          >
          <p class="employee-attr" v-if="status == 'show'">{{ state.TerminationDate }}</p>
        </div>
      </div>
      <div class="button">
        <button v-if="status == 'edit'" class="button-update" type="submit">Update</button>
        <p class="hint" v-if="isShowhint">Updated Success ！</p>
        <button v-if="status == 'show'" class="button-update" @click="changeStatus">Edit</button>
        <button class="button-update back" @click="router.push('/')">Back</button>
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
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: none;
  background-color: transparent;
  font-size: 15px;
}
.group {
  position: relative;
}
span {
  position: absolute;
  top: 65px;
  left: 0px;
  font-size: 13px;
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
.employee-attr {
  font-weight: 800;
  font-size: 20px;
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
  /* border-radius: 10px; */
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
  display: flex;
  width: 80%;
  justify-content: space-between;
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
.back {
  background-color: black !important;

  margin-left: 30px;
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
select {
  width: 100%;
  margin: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 2px 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 15px;
}
select option {
  font-size: 14px;
  padding-top: 10px;
  color: #333;
  cursor: pointer;
  height: 40px;
}
.hint {
  position: absolute;
  color: var(--color-theme);
  top: 20px;
  background-color: white;
  box-shadow: 0px 0px 15px -10px rgba(66, 68, 90, 1);
  border-radius: 5px;
  padding: 30px 20px;
  background-color: #fff;
  animation: toastAnimation 0.2s ease-out;
  right: 20px;
}
@keyframes toastAnimation {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
