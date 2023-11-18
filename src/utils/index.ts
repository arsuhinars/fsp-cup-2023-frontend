import router from '@/router'
import { ApiError } from '@/api/utils'

export async function tryApi<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise
  } catch (error) {
    if (error instanceof ApiError) {
      router.push({
        name: 'error',
        params: {
          details: error.details
        }
      })
    }

    throw error
  }
}
