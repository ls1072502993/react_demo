import { useState, useEffect } from 'react'
import { InputNumber, Button } from 'antd'
import * as SystemApi from '@/api/system/index'

export default function App() {
  const key = 'tickets_poker'
  const [area1, setArea1] = useState<any>([])
  const [area1Key, setArea1Key] = useState<string[]>([])
  const [area2, setArea2] = useState<any>([])
  const [area2Key, setArea2Key] = useState<string[]>([])
  useEffect(() => {
    SystemApi.settingDetail({
      key,
    }).then((res: any) => {
      setArea1(res.data.area1)
      setArea1Key(Object.keys(res.data.area1) as string[])
      setArea2(res.data.area2)
      setArea2Key(Object.keys(res.data.area2) as string[])
    })
  }, [])
  function submitFn() {
    SystemApi.settingSave({
      key,
      values: { area2, area1 },
    })
  }
  function getSums() {
    let num = 0
    for (let key in area1) {
      num += area1[key].num * area1[key].single_reward
    }
    for (let key in area2) {
      num += area2[key].num * area2[key].single_reward
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
            value={area1[v].num}
            onChange={e =>
              setArea1({
                ...area1,
                [v]: {
                  ...area1[v],
                  num: e,
                },
              })
            }
          />
          <span className="inline-block w-[90px] ml-[10px]">单注奖金</span>
          <InputNumber
            className="w-[200px]!"
            value={area1[v].single_reward}
            onChange={e =>
              setArea1({
                ...area1,
                [v]: {
                  ...area1[v],
                  single_reward: e,
                },
              })
            }
          />
          <span className="inline-block w-[90px] ml-[10px]">单项奖金合计</span>
          {area1[v].num * area1[v].single_reward}
        </div>
      ))}
      {area2Key.map((v, i) => (
        <div key={i} className="w-[100%] flex items-center mb-[10px]">
          <span className="inline-block w-[90px]">{area2[v].name}</span>
          <span className="inline-block w-[90px]">总数量</span>
          <InputNumber
            className="w-[200px]!"
            value={area2[v].num}
            onChange={e =>
              setArea2({
                ...area2,
                [v]: {
                  ...area2[v],
                  num: e,
                },
              })
            }
          />
          <span className="inline-block w-[90px] ml-[10px]">单注奖金</span>
          <InputNumber
            className="w-[200px]!"
            value={area2[v].single_reward}
            onChange={e =>
              setArea2({
                ...area2,
                [v]: {
                  ...area2[v],
                  single_reward: e,
                },
              })
            }
          />
          <span className="inline-block w-[90px] ml-[10px]">单项奖金合计</span>
          {area2[v].num * area2[v].single_reward}
        </div>
      ))}
      <Button type="primary" onClick={submitFn}>
        保存
      </Button>
      <span className="text-[red] ml-[15px]">总和：{getSums()}</span>
    </>
  )
}
