import { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { router } from '@/router/index'
import { useUserStore } from '@/store/index'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export default function App() {
  // 初始化用户数据
  const { getUserInfo, getStoreInfo } = useUserStore()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserInfo()
      getStoreInfo()
    }
  }, [])

  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}
