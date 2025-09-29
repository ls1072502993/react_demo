import { request } from '@/api/request.js'

// 记录列表
export const getTableList = (data?: any) => {
  return request('/activity.lottery/goldList', {
    method: 'get',
    data,
  })
}
