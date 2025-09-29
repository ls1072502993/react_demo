import { request } from '@/api/request.js'

// 批次列表
export const getBatchList = (data?: any) => {
  return request('/activity.lottery/batchList', {
    method: 'get',
    data,
  })
}

// 统计
export const statisticsData = (data?: any) => {
  return request('/activity.lottery/statisticsData', {
    method: 'get',
    data,
  })
}
