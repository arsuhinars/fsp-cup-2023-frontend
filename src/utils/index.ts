import router from '@/router'
import { ApiError } from '@/api/utils'
import type { User } from '@/schemas/users'
import type { Player } from '@/schemas/players'

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
  const a = s.split('-', 3)
  if (a.length < 3) {
    throw new Error('Invalid string provided')
  }
  return new Date(Number.parseInt(a[0]), Number.parseInt(a[1]) - 1, Number.parseInt(a[2]))
}

export function pushErrorPage(error: any) {
  console.log(error)
  router.push({
    name: 'error',
    params: {
      details: error instanceof ApiError ? error.details : ''
    }
  })
}

export function extractFullName(user: User | Player): string {
  return `${user.last_name} ${user.first_name} ${user.patronymic}`
}

export function compareObjects(
  lhs: { [key: string]: any },
  rhs: { [key: string]: any },
  excludeFields?: string[]
) {
  const excludeFieldsSet = new Set(excludeFields)
  const fieldsLhs = Object.keys(lhs).filter((key) => !excludeFieldsSet.has(key))
  const fieldsRhs = Object.keys(rhs).filter((key) => !excludeFieldsSet.has(key))

  if (fieldsLhs.length !== fieldsRhs.length) {
    return false
  }

  for (const key of fieldsLhs) {
    if (lhs[key] !== rhs[key]) {
      return false
    }
  }

  return true
}
