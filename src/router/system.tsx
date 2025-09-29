import { lazy } from 'react'
import { Navigate } from 'react-router'
import BeforeEach from './beforeEach'
import Layout from '@/components/Layout/Index'

// 布局
export const LayoutWarp = () => {
  return (
    <BeforeEach>
      <Layout />
    </BeforeEach>
  )
}

// 管道
export const Pipe = (url: any) => {
  const Comp = lazy(url)
  return <Comp />
}

// 重定向
export const Redirect = (url: any) => {
  return <Navigate to={url} replace />
}
