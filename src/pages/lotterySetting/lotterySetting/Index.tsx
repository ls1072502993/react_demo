import { useState } from 'react'
import { Card } from 'antd'
import LotteryRecordsSetting from './LotteryRecordsSetting/Index'
import GoldLotteryRecordsSetting from './GoldLotteryRecordsSetting/Index'
import PyramidSetting from './PyramidSetting/Index'
import BullRecordsSetting from './BullRecordsSetting/Index'
import PokerRecordsSetting from './PokerRecordsSetting/Index'

export default function App() {
  /********************************** tabs **********************************/
  const tabs = [
    { key: '0', label: '蛇年大吉' },
    { key: '1', label: '黄金矿工' },
    { key: '2', label: '金字塔' },
    { key: '3', label: '牛气冲天' },
    { key: '4', label: '扑克牌' },
  ]
  const [activeTabs, setActiveTabs] = useState<string>('0')
  const chaneTabs = (key: string) => {
    setActiveTabs(key)
  }
  function getComp() {
    switch (activeTabs) {
      case '0':
        return <LotteryRecordsSetting />
      case '1':
        return <GoldLotteryRecordsSetting />
      case '2':
        return <PyramidSetting />
      case '3':
        return <BullRecordsSetting />
      case '4':
        return <PokerRecordsSetting />
    }
  }
  return (
    <Card activeTabKey={activeTabs} tabList={tabs} onTabChange={chaneTabs}>
      {getComp()}
    </Card>
  )
}
