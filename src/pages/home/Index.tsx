import { useEffect, useState } from 'react'
import { Card, Col, Row, Statistic } from 'antd'
import type { StatisticProps } from 'antd'
import RangePicker, { type RangePickerProps } from '@/components/RangePicker/Index'
import dayjs from 'dayjs'
import * as HomeApi from '@/api/home/index'

export default function App() {
  const [dates, setDates] = useState<RangePickerProps['value']>([
    dayjs().format('YYYY-MM-DD 00:00:00'),
    dayjs().format('YYYY-MM-DD 23:59:59'),
  ])
  const [loading, setLoading] = useState<boolean>(false)
  const [dataSurveyData, setDataSurveyData] = useState<Record<string, any>>({})

  useEffect(() => {
    setLoading(true)
    HomeApi.dataSurvey({
      startDate: dates?.[0] || '',
      endDate: dates?.[1] || '',
    })
      .then(res => setDataSurveyData(res.data))
      .finally(() => setLoading(false))
  }, [dates])

  const StatisticItem = (props: StatisticProps) => {
    return <Statistic {...props} loading={loading} />
  }

  return (
    <Card title="数据概况">
      <RangePicker onChange={values => setDates(values)} value={dates} />
      <Row gutter={[20, 20]} className="mt-[20px]">
        <Col span={6}>
          <StatisticItem title="充值总额(元)" value={dataSurveyData.orderTotalPrice} precision={2} />
        </Col>
        <Col span={6}>
          <StatisticItem title="支付订单数(笔)" value={dataSurveyData.orderTotal} />
        </Col>
        <Col span={6}>
          <StatisticItem title="消费人数" value={dataSurveyData.consumeUsers} />
        </Col>
        <Col span={6}>
          <StatisticItem title="新增会员" value={dataSurveyData.userTotal} />
        </Col>
        <Col span={6}>
          <StatisticItem title="新增付费用户" value={dataSurveyData.newConsumeUsers} />
        </Col>
        <Col span={6}>
          <StatisticItem title="当前在线" value={dataSurveyData.online_user_num} />
        </Col>
        <Col span={6}>
          <StatisticItem title="VIP在线" value={dataSurveyData.player_vip0_num} />
        </Col>
      </Row>
    </Card>
  )
}
