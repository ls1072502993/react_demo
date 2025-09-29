import { request } from '@/api/request.js'

// 场景列表
export const getSceneList = (data?: any) => {
  return request('/Scene/index', {
    method: 'get',
    data,
  })
}
