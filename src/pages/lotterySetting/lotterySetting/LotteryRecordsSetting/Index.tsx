import { useState, useEffect } from 'react'
import { InputNumber, Button } from 'antd'
import * as SystemApi from '@/api/system/index'

export default function App() {
  const key = 'tickets_flipping'
  const [area1, setArea1] = useState<any>([])
  const [area1Key, setArea1Key] = useState<string[]>([])
  useEffect(() => {
    SystemApi.settingDetail({
      key,
    }).then((res: any) => {
      setArea1(res.data.area1)
      setArea1Key(Object.keys(res.data.area1) as string[])
    })
  }, [])
  function submitFn() {
    SystemApi.settingSave({
      key,
      values: { area1 },
    })
  }
  function getSums() {
    let num = 0
    for (let key in area1) {
      num += area1[key].amount * area1[key].prize
    }
    return num
  }
  return (
    <>
      {area1Key.map((v, i) => (
        <div key={i} className="w-[100%] flex items-center mb-[10px]">
          <span className="inline-block w-[90px]">{area1[v].name}</span>
          <span className="inline-block w-[90px]">总数量</span>
          <InputNumber
            className="w-[200px]!"
            value={area1[v].amount}
            onChange={e =>
              setArea1({
                ...area1,
                [v]: {
                  ...area1[v],
                  amount: e,
                },
              })
            }
          />
          <span className="inline-block w-[90px] ml-[10px]">单注奖金</span>
          <InputNumber
            className="w-[200px]!"
            value={area1[v].prize}
            onChange={e =>
              setArea1({
                ...area1,
                [v]: {
                  ...area1[v],
                  prize: e,
                },
              })
            }
          />
          <span className="inline-block w-[90px] ml-[10px]">单项奖金合计</span>
          {area1[v].amount * area1[v].prize}
        </div>
      ))}
      <Button type="primary" onClick={submitFn}>
        保存
      </Button>
      <span className="text-[red] ml-[15px]">总和：{getSums()}</span>
    </>
  )
}
