import { useState, useEffect, Fragment } from 'react'
import { Input, Select, Tabs, Card, Form, Button, Spin, Tag, Divider } from 'antd'
import type { TabsProps } from 'antd'
import * as GameApi from '@/api/game/index'

export default function App() {
  /********************************** 筛选列表 **********************************/
  // 房间列表
  const [gameList, setGameList] = useState<Record<string, any>[]>([])
  const [spinning, setSpinning] = useState<boolean>(false)
  const [searchData, setSearchData] = useState<Record<string, any>>({
    machine_type: '',
    category_id: '',
    desc: '',
    page: 1,
    limit: 10000,
  })
  useEffect(getGameList, [searchData])
  function getGameList() {
    setSpinning(true)
    GameApi.getGameList(searchData)
      .then(res => setGameList(res.data.data))
      .finally(() => setSpinning(false))
  }
  const machineTypeList: any[] = [
    { label: '全部', value: 0 },
    { label: '本地机台', value: 1 },
    { label: '云机台', value: 2 },
  ]
  function onFinish(formValues: any) {
    setSearchData(values => ({
      ...values,
      ...formValues,
    }))
  }
  // 房间类型tabs
  const [tabs, setTabs] = useState<TabsProps['items']>([])
  const chaneTabs = (key: string) => {
    setSearchData(values => ({ ...values, category_id: key }))
  }
  useEffect(() => {
    GameApi.getCategoryList({ page: 1, limit: 10000 }).then(res => {
      setTabs([
        { key: '', label: '全部' },
        ...res.data.list.data.map((v: any) => ({
          key: v.id.toString(),
          label: v.name,
        })),
      ])
    })
  }, [])
  /********************************** End **********************************/
  function RoomItem() {
    // 获取房间座位数量
    function getLoopCount(num: number): number {
      const mapping: Record<number, number> = { 1: 1, 8: 8, 5: 5 }
      return mapping[num] ?? 4
    }
    // 座位组件
    function SeatItem(item: Record<string, any>) {
      const seatNumber = getLoopCount(item.room?.device?.num) // 座位数量
      return Array.from({ length: seatNumber }, (_, index) => {
        const seatDetail = item.seat.find((v: any) => v.chair_id == index) // 座位信息
        const userDetail = item.play_user_list.find((v: any) => v.seat_id == index) // 用户信息
        return (
          <Fragment key={index}>
            <div className="flex items-center w-full h-[80px]">
              {seatDetail.device_status == 0 ? <Tag color="success">正常</Tag> : <Tag color="error">断网</Tag>}
              {userDetail ? (
                <div className="w-[60px] flex flex-col items-center ">
                  <img src={userDetail.avatar_url || null} className="block w-[60px] h-[60px] rounded-[50%]" />
                  <div className="truncate w-full text-center">{userDetail.nick_name}</div>
                </div>
              ) : (
                ''
              )}
            </div>
            {index < seatNumber - 1 && <Divider className="m-[0_0_0_0]!" />}
          </Fragment>
        )
      })
    }
    return gameList.map(item => (
      <Card key={item.id} className="w-[380px] m-[0_10px_10px_0]!" title={item.room?.room_name} size="small">
        {SeatItem(item)}
      </Card>
    ))
  }
  return (
    <Card>
      <Form layout="inline" onFinish={onFinish}>
        <Form.Item label="机台名称" name="desc" className="mb-[10px]!">
          <Input />
        </Form.Item>
        <Form.Item label="机台类型" name="machine_type" className="mb-[10px]!">
          <Select className="w-[250px]!" options={machineTypeList} />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="mb-[10px]!">
          查询
        </Button>
      </Form>
      <Tabs activeKey={searchData.category_id} items={tabs} onChange={chaneTabs} />
      <Spin spinning={spinning} className="flex! flex-wrap! size-full!">
        <div className="flex flex-wrap size-full">{RoomItem()}</div>
      </Spin>
    </Card>
  )
}
