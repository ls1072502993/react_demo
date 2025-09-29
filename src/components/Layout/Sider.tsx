import Menu from './Menu'
import { useUserStore, useSystemStore } from '@/store/index'

export default function App() {
  const { storeInfo } = useUserStore()
  const { collapsed } = useSystemStore()
  return (
    <div className={`${collapsed ? 'w-[80px]' : 'w-[200px]'} flex flex-col duration-300`}>
      {!collapsed && (
        <div className="w-[100%] h-[64px] flex items-center justify-center font-bold tracking-[2px] text-[20px]">
          {storeInfo.store_name}
        </div>
      )}
      <div className="w-[100%] grow-[1] relative">
        <div className="w-[100%] absolute inset-[0]">
          <Menu />
        </div>
      </div>
    </div>
  )
}
