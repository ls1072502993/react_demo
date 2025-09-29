import { request } from '@/api/request.js'

// 统计信息
export const dataSurvey = (data?: any) => {
  return request('/statistics.data/survey', {
    method: 'get',
    data,
  })
}
