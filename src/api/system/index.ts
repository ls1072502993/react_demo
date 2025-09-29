import { request } from '@/api/request.js'

// 配置信息
export const settingDetail = (data?: any) => {
  return request('/setting/detail', {
    method: 'get',
    data,
  })
}

// 保存配置
export const settingSave = (data?: any) => {
  return request('/setting/save', {
    method: 'post',
    data,
  })
}
