import { Dropdown, Avatar } from 'antd'
import { useNavigate } from 'react-router'
import type { MenuProps } from 'antd'
import { LogoutOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { logout } from '@/api/user/index'
import { useUserStore, useSystemStore } from '@/store/index'

export default function App() {
  const { userInfo } = useUserStore()
  const { collapsed, changeCollapsed } = useSystemStore()
  const navigate = useNavigate()
  const items: MenuProps['items'] = [
    {
      key: '0',
      label: userInfo.real_name,
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '1',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ]
  const onClick: MenuProps['onClick'] = ({ key }) => {
    // 退出登录
    if (key === '1') {
      logout().then(() => {
        navigate('/login', { replace: true })
      })
    }
  }
  return (
    <div className="w-full h-[64px] bg-[#ffffff] shadow-[0_4px_4px_-3px_rgba(0,21,41,0.08)] z-[1] flex justify-between items-center p-[0_20px]">
      <div className="h-full flex items-center">
        <div onClick={changeCollapsed} className="cursor-pointer">
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
      <div className="h-full flex items-center">
        <Dropdown menu={{ items, onClick }} arrow placement="bottomRight">
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </div>
  )
}
