import * as Icon from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { createElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Menu } from 'antd'
import { pageRouter } from '@/router/page'
import { useSystemStore } from '@/store/index'

function getIcon(name: keyof typeof Icon) {
  const Comp = Icon[name]
  return createElement(Comp as any)
}

function getMenuList(list: any = pageRouter) {
  return list.map((item: any) => {
    if (item.title) {
      return {
        key: item.children?.length == 2 ? item.children[1].path : item.path,
        label: item.title,
        icon: item.icon ? getIcon(item.icon) : null,
        children: item.children?.length > 2 ? getMenuList(item.children) : null,
      }
    }
  })
}

export default function App() {
  const { collapsed } = useSystemStore()
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([''])
  const [openKeys, setOpenKeys] = useState<string[]>([''])

  useEffect(() => {
    setSelectedKeys([location.pathname])
    setOpenKeys([`/${location.pathname.split('/')[1]}`])
  }, [location])

  const onOpenChange: MenuProps['onOpenChange'] = e => {
    setOpenKeys(e)
  }

  const onClick: MenuProps['onClick'] = e => {
    setSelectedKeys([e.key])
    navigate(e.key)
  }

  return (
    <Menu
      className="w-[100%] h-[100%] overflow-y-auto"
      inlineCollapsed={collapsed}
      onClick={onClick}
      onOpenChange={onOpenChange}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      mode="inline"
      items={getMenuList()}
    />
  )
}
