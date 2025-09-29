import axios from 'axios'
import { message } from 'antd'
import type { NavigateFunction } from 'react-router'

// 存储 navigate 函数的变量
let navigate: NavigateFunction

// 提供设置 navigate 的方法
export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 6000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token') || ''
    config.headers['Access-Token'] = token

    const storeid = localStorage.getItem('storeid') || ''
    config.headers['Storeid'] = storeid
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    const { data, config } = response
    // 请求成功
    if (data.status == 200) {
      if (config.method == 'post') {
        message.success(data.message)
      }
      return data
    }
    // 登录状态失效
    else if (data.status == 401) {
      localStorage.clear()
      // 使用 navigate 跳转
      navigate?.('/login', { replace: true })
    }
    // 请求失败
    else {
      message.error(data.message)
      return Promise.reject(data)
    }
  },
  error => {
    return Promise.reject(error)
  },
)

export default instance
