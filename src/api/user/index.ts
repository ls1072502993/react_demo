import { request } from '@/api/request.js'

// 登录
export const login = (data?: any) => {
  return request('/passport/login', {
    method: 'post',
    data,
  })
}

// 退出登录
export const logout = (data?: any) => {
  return request('/passport/logout', {
    method: 'post',
    data,
  })
}

// 用户信息
export const getUserInfo = (data?: any) => {
  return request('/store.user/info', {
    method: 'get',
    data,
  })
}

// 项目信息
export const getStoreInfo = (data?: any) => {
  return request('/store/info', {
    method: 'get',
    data,
  })
}
