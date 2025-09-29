import { useRef } from 'react'
import { Outlet } from 'react-router'
import { FloatButton } from 'antd'

export default function App() {
  const myRef = useRef<any>(null)

  return (
    <div className="relative grow-[1] bg-[#f5f5f5]">
      <div className="absolute inset-[0] overflow-y-auto" ref={myRef}>
        {/* <Card className="m-[10px]!" title={title}> */}
        <div className="m-[10px]!">
          {/* Outlet 用于渲染二级路由 */}
          <Outlet />
        </div>
        <FloatButton.BackTop target={() => myRef.current} />
      </div>
    </div>
  )
}
