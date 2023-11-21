import router from '@/router'
import { ApiError } from '@/api/utils'

export function dateToString(date: Date): string {
  return (
    date.getFullYear().toString().padStart(4, '0') +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0')
  )
}

export function dateFromString(s: string): Date {
  console.log(s)
  const a = s.split('-', 3)
  if (a.length < 3) {
    throw new Error('Invalid string provided')
  }
  return new Date(Number.parseInt(a[0]), Number.parseInt(a[1]) - 1, Number.parseInt(a[2]))
}

export function pushErrorPage(error: any) {
  router.push({
    name: 'error',
    params: {
      details: error instanceof ApiError ? error.details : ''
    }
  })
}
