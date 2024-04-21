export function compareDates(date1: string | Date, date2: string | Date): boolean | string {
  const d1: Date = new Date(date1)
  const d2: Date = new Date(date2)
  if ((date1 !== '' && isNaN(d1.getTime())) || (date2 !== '' && isNaN(d2.getTime()))) return 'error'
  // if (date2 !== '' && isNaN(d2.getTime())) return 'error'
  return d1.getTime() < d2.getTime()
}

export function getStatus(employmentDate: string, terminationDate: string): string {
  if (typeof compareDates(terminationDate, employmentDate) == 'string') return 'Error'
  if (terminationDate && compareDates(terminationDate, employmentDate)) {
    return 'Error'
  }
  if (employmentDate && !compareDates(employmentDate, new Date())) return 'employed soon'

  if (!terminationDate && compareDates(employmentDate, new Date())) return 'currently employed'

  if (terminationDate && !compareDates(terminationDate, new Date())) return 'to be terminated'

  if (terminationDate && compareDates(terminationDate, new Date())) return 'terminated'
  return ''
}

export const getStatusClass = (value: string | number): string => {
  switch (value) {
    case 'Error':
      return 'red'
    case 'employed soon':
      return 'blue'
    case 'currently employed':
      return 'green'
    case 'to be terminated':
      return 'yellow'
    case 'terminated':
      return 'black'
    default:
      return 'grey'
  }
}
