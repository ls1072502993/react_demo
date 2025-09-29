import { create } from 'zustand'

interface SystemState {
  collapsed: boolean
  changeCollapsed: () => void
}

export const useSystemStore = create<SystemState>(set => ({
  collapsed: false,
  changeCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
}))
