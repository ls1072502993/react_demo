import http from './axios'

interface ApiResponse<T = any> {
  status: number
  data: T
  message: string
}

export const request = <T = any>(url: string, options: Record<string, any>): Promise<ApiResponse<T>> => {
  const { data, method } = options
  const _method = options.method.toLowerCase()
  return http.request({
    url,
    [_method == 'get' ? 'params' : 'data']: data,
    method,
  })
}
