import { defineStore } from 'pinia'
import type Employee from '@/interfaces/Employee'
import { getAllEmployees } from '@/lib/api/employees'

interface State {
  loadListOnce: boolean
  employeeList: Employee[]
  filterEmployeeList: Employee[]
  displayedEmployeeList: Employee[]
  filterInput: string
  employee: Employee | null
  tableHeight: number
  rowHeight: number
  currentPage: number
  numberOfRows: number
  numberOfPages: number
}

export const tableStore = defineStore('tableStore', {
  state: (): State => {
    return {
      loadListOnce: false,
      employeeList: [],
      filterEmployeeList: [],
      displayedEmployeeList: [],
      filterInput: '',
      employee: null,
      tableHeight: 100,
      rowHeight: 50,
      currentPage: 1,
      numberOfPages: 0,
      numberOfRows: 0
    }
  },
  getters: {
    getEmployeeById: (state) => {
      return (employeeId: string) =>
        state.employeeList.find((employee) => employee.Id === employeeId)
    }
  },
  actions: {
    async fetchAllEmployees() {
      try {
        this.employeeList = (await getAllEmployees()).Employees
        console.log(this.employeeList, this.tableHeight)
      } catch (error) {
        console.log(error)
        return error
      }
    },
    refreshDataTable() {
      this.currentPage = 1

      this.filterInput !== '' &&
        (this.filterEmployeeList = this.employeeList.filter((data) =>
          `${data.Occupation}`.toLowerCase().includes(`${this.filterInput.toLowerCase()}`)
        ))

      this.displayedEmployeeList = (
        this.filterInput === '' ? this.employeeList : this.filterEmployeeList
      ).slice(
        this.currentPage === 1 ? 0 : (this.currentPage - 1) * this.numberOfRows,
        this.currentPage === 1 ? this.numberOfRows : this.currentPage * this.numberOfRows
      )

      this.numberOfPages = Math.ceil(
        this.filterInput === ''
          ? this.employeeList.length / this.numberOfRows
          : this.filterEmployeeList.length / this.numberOfRows
      )
    },
    setSeletectedEmployee(employeeId: string) {
      this.employee = this.employeeList.find((employee) => employee.Id === employeeId) || null
    },
    setUnseletectedEmployee() {
      this.employee = null
    },
    updateEmployee(updateEmployee: Employee) {
      let index: number | null = null
      this.employeeList.find((employee, i) => {
        return employee.Id === updateEmployee.Id && (index = i)
      })
      index !== null && (this.employeeList[index] = updateEmployee)
    },
    setLoadListOnce() {
      this.loadListOnce = true
    }
  }
})
