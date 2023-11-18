import { useAuthStore } from '@/stores/auth'

export class ApiError extends Error {
  private _statusCode: number
  private _details: string

  get statusCode() {
    return this._statusCode
  }

  get details() {
    return this._details
  }

  constructor(statusCode: number, details: any) {
    const _details = JSON.stringify(details, null, 2)

    super(`API error with ${statusCode} status code.\nDetails:\n${details}`)

    this._statusCode = statusCode
    this._details = _details
  }
}

export async function apiGet(path: string, params: QueryParams): Promise<any> {
  const url = buildUrl(path, params)
  const options = buildRequestInit({ method: 'GET' })
  return await doFetch(url, options)
}

export async function apiPost(path: string, body: any, params: QueryParams): Promise<any> {
  const url = buildUrl(path, params)
  const options = buildRequestInit({ method: 'POST', body: JSON.stringify(body) })
  return await doFetch(url, options)
}

export async function apiPut(path: string, body: any, params: QueryParams): Promise<any> {
  const url = buildUrl(path, params)
  const options = buildRequestInit({ method: 'PUT', body: JSON.stringify(body) })
  return await doFetch(url, options)
}

export async function apiDelete(path: string, params: QueryParams): Promise<any> {
  const url = buildUrl(path, params)
  const options = buildRequestInit({ method: 'DELETE' })
  return await doFetch(url, options)
}

type QueryParams = { [key: string]: any }

function buildUrl(path: string, params: QueryParams): URL {
  const url = new URL(path, import.meta.env.API_URL)

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value)
  }

  return url
}

function buildRequestInit(base: RequestInit) {
  const auth = useAuthStore()

  const init = structuredClone(base)
  base.headers ??= {}

  if (auth.credentials !== null) {
    Object.assign(base.headers, {
      Authorization: `Basic ${auth.credentials}`
    })
  }

  return init
}

async function doFetch(url: URL, init: RequestInit): Promise<any> {
  let response: Response, json: any

  try {
    response = await fetch(url, init)
  } catch (error) {
    console.log('Error occured while fetching', error)
    throw error
  }

  try {
    json = await response.json()
  } catch (error) {
    console.log('Error occured while parsing json', error)
    throw error
  }

  if (!response.ok) {
    throw new ApiError(response.status, json)
  }

  return json
}
