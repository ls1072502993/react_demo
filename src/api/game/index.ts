import { request } from '@/api/request.js'

// 房间类型
export const getCategoryList = (data?: any) => {
  return request('/game.category/index', {
    method: 'get',
    data,
  })
}

// 房间列表
export const getGameList = (data?: any) => {
  return request('/game.game/index', {
    method: 'get',
    data,
  })
}
