import { request } from '@/api/request.js'

// 用户信息
export const getTableList = (data?: any) => {
  return request('/store.user/info', {
    method: 'get',
    data,
  })
}
