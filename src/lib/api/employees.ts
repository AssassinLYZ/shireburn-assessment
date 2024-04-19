import type Employee from '@/interfaces/Employee'
import RestApiService from './service'

const apiService = new RestApiService()

// -----------------------------------------------------------------------------------------------------
// GET list
export async function getAllEmployees(): Promise<{ Employees: Employee[] }> {
  return await apiService.get(`data/shireburn-test-data.json`, null)
}
