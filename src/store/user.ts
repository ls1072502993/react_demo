import { create } from 'zustand'
import * as UserApi from '@/api/user/index'

interface UserState {
  roles: Record<string, any>
  userInfo: Record<string, any>
  storeInfo: Record<string, any>
  getUserInfo: () => Promise<Record<string, any>>
  getStoreInfo: () => Promise<Record<string, any>>
}

export const useUserStore = create<UserState>(set => ({
  roles: {},
  userInfo: {},
  getUserInfo: () => {
    return new Promise((resolve, reject) => {
      UserApi.getUserInfo().then((res: any) => {
        set({
          userInfo: res.data.userInfo,
          roles: res.data.roles,
        })
        resolve(res)
      }, reject)
    })
  },
  storeInfo: {},
  getStoreInfo: () => {
    return new Promise((resolve, reject) => {
      UserApi.getStoreInfo().then((res: any) => {
        set({
          storeInfo: res.data.storeInfo,
        })
        resolve(res)
      }, reject)
    })
  },
}))
