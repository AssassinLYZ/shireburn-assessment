import { defineStore } from 'pinia'
import type employee from '@/interfaces/Employee'
import { getAllEmployees } from '@/lib/api/employees'

interface State {
  loadListOnce: boolean
  employeeList: employee[]
}

export const tableStore = defineStore('tableStore', {
  state: (): State => {
    return {
      loadListOnce: false,
      employeeList: []
    }
  },
  getters: {
    getEmployeeById: (state) => {
      return (EmployeeId: string) =>
        state.employeeList.find((employee) => employee.Id === EmployeeId)
    }
  },
  actions: {
    async fetchAllEmployees() {
      try {
        this.employeeList = (await getAllEmployees()).Employees
      } catch (error) {
        console.log(error)
        return error
      }
    },

    setLoadListOnce() {
      this.loadListOnce = true
    }
  }
})
