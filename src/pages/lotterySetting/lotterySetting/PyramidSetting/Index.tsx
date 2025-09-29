import { useState, useEffect } from 'react'
import { InputNumber, Button } from 'antd'
import * as SystemApi from '@/api/system/index'

export default function App() {
  const key = 'tickets_tower'
  const [area3, setArea3] = useState<any[]>([])
  useEffect(() => {
    SystemApi.settingDetail({
      key,
    }).then((res: any) => {
      setArea3(res.data.area3)
    })
  }, [])
  function submitFn() {
    SystemApi.settingSave({
      key,
      values: { area3 },
    })
  }
  function getSums() {
    let num = 0
    for (let key in area3) {
      num += area3[key].total_num * area3[key].amount
    }
    return num
  }
  return (
    <>
      {area3.map((v, i) => (
        <div key={i} className="w-[100%] flex items-center mb-[10px]">
          <span className="inline-block w-[90px]">{v.name}</span>
          <span className="inline-block w-[90px]">总数量</span>
          <InputNumber
            style={{ width: 200 }}
            value={v.total_num}
            onChange={e => setArea3(area3.map(item => (item.name === v.name ? { ...item, total_num: e } : item)))}
          />
          <span className="inline-block w-[90px] ml-[10px]">单注奖金</span>
          <InputNumber
            style={{ width: 200 }}
            value={v.amount}
            onChange={e => setArea3(area3.map(item => (item.name === v.name ? { ...item, amount: e } : item)))}
          />
          <span className="inline-block w-[90px] ml-[10px]">单项奖金合计</span>
          {v.total_num * v.amount}
        </div>
      ))}
      <Button type="primary" onClick={submitFn}>
        保存
      </Button>
      <span className="ml-[15px] text-[red]">总和：{getSums()}</span>
    </>
  )
}
