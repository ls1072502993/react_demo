import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Header from './Header'
import Sider from './Sider'
import Content from './Content'
import { setNavigate } from '@/api/axios'

export default function App() {
  // 初始化路由跳转方法给axios如果登录失效跳转
  const navigate = useNavigate()
  useEffect(() => {
    setNavigate(navigate)
  }, [navigate])
  return (
    <div className="size-full flex">
      <Sider />
      <div className="flex grow-1 bg-[red] flex-col">
        <Header />
        <Content />
      </div>
    </div>
  )
}
