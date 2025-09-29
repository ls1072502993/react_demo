import { useEffect } from 'react'
import { type PropsWithChildren } from 'react'
import { useNavigate, useLocation } from 'react-router'

const BeforeEach = (props: PropsWithChildren) => {
  const navigate = useNavigate()
  const location = useLocation()

  const publicPaths = ['/login']
  const isPublicPage = publicPaths.includes(location.pathname)

  useEffect(() => {
    // 检查认证状态
    const isAuthenticated = !!localStorage.getItem('token')

    if (!isAuthenticated && !isPublicPage) {
      // 未认证且不在公开页面，重定向到登录
      navigate('/login', {
        replace: true,
        state: { from: location.pathname },
      })
    } else if (isAuthenticated && isPublicPage) {
      // 已认证但尝试访问公开页面，重定向到首页
      navigate('/home', { replace: true })
    }
  }, [location])

  return props.children
}

export default BeforeEach
