import { useState, useEffect } from 'react'
import { Form, Input, Table, Button, Tabs, Descriptions, Card } from 'antd'
import type { TableProps } from 'antd'
import * as LotteryApi from '@/api/lottery/pokerRecords'
import * as LotteryCommonApi from '@/api/lottery/common'

export default function App() {
  /********************************** 请求参数 **********************************/
  const [formData, setFormData] = useState({
    page: 1,
    limit: 10,
    user_id: '',
    batch_id: '',
  })
  const [dataSource, setDataSource] = useState({
    descriptionsItem: [],
    loading: false,
    list: [],
    total: 0,
  })
  const columns: TableProps['columns'] = [
    {
      title: '用户信息',
      dataIndex: 'user',
      render: (text: any) => (
        <>
          <p>昵称：{text.nick_name}</p>
          <p>ID：{text.user_id}</p>
        </>
      ),
    },
    {
      align: 'center',
      title: '票据',
      dataIndex: 'ticket_id',
    },
    {
      align: 'center',
      title: '是否抽奖',
      dataIndex: 'is_del',
      render: (text: any) => <>{text == 1 ? '已抽奖' : '未抽奖'}</>,
    },
    {
      align: 'center',
      title: '奖品',
      dataIndex: 'award_level',
      render: (text: any) => <>{text > 0 ? `${text}等奖` : '-'}</>,
    },
    {
      align: 'center',
      title: '奖励金币1',
      dataIndex: 'reward_a',
    },
    {
      align: 'center',
      title: '奖励金币2',
      dataIndex: 'reward_b',
    },
    {
      align: 'center',
      title: '批次',
      dataIndex: 'batch_id',
    },
    {
      align: 'center',
      title: '时间',
      dataIndex: 'updated_at',
    },
  ]
  /********************************** 获取表格数据 **********************************/
  useEffect(() => {
    getTableList()
  }, [formData])
  async function getTableList() {
    setDataSource(values => ({
      ...values,
      loading: true,
    }))
    // 获取表格数据
    const { data: tableData } = (await LotteryApi.getTableList(formData)) as any
    // 获取统计数据
    const { data: statisticsData } = (await LotteryCommonApi.statisticsData({ ...formData, type: 5 })) as any
    function Item({ detail }: any) {
      return (
        <>
          <span style={{ color: 'green', marginRight: 20 }}>
            {detail.usedCount.toLocaleString()} / {detail.totalCount.toLocaleString()}
          </span>
          <span style={{ color: 'red' }}>
            {detail.usedCoins.toLocaleString()}金币/{detail.totalCoins.toLocaleString()}金币
          </span>
        </>
      )
    }
    const descriptionsItem = [
      {
        label: '总量',
        children: <Item detail={statisticsData.total} />,
      },
      ...statisticsData.list.map((v: any) => ({
        label: v.award_level_name,
        children: <Item detail={v} />,
      })),
    ] as any
    setDataSource(values => ({
      ...values,
      loading: false,
      list: tableData.data,
      total: tableData.total,
      descriptionsItem,
    }))
  }
  /********************************** 切换分页 **********************************/
  function handleTableChange(pagination: any) {
    setFormData(values => ({
      ...values,
      page: pagination.current,
      limit: pagination.pageSize,
    }))
  }
  /********************************** 查询数据 **********************************/
  function onFinish(formValues: any) {
    setFormData(values => ({
      ...values,
      ...formValues,
      page: 1,
    }))
  }
  /********************************** tabs **********************************/
  const [tabs, setTabs] = useState([])
  const [activeTabs, setActiveTabs] = useState('')
  const chaneTabs = (key: string) => {
    setFormData(values => ({
      ...values,
      batch_id: key,
      page: 1,
    }))
    setActiveTabs(key)
  }
  useEffect(() => {
    LotteryCommonApi.getBatchList({ type: 5 }).then((res: any) => {
      setTabs([
        {
          key: '',
          label: '全部',
        },
        ...res.data.map((v: any) => ({
          key: v,
          label: v,
        })),
      ] as any)
    })
  }, [])
  return (
    <Card>
      <Form layout="inline" onFinish={onFinish}>
        <Form.Item label="用户ID" name="user_id">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form>
      <Descriptions bordered items={dataSource.descriptionsItem} size="small" style={{ marginTop: 10 }} column={4} />
      <Tabs activeKey={activeTabs} items={tabs} onChange={chaneTabs} />
      <Table
        rowKey="id"
        bordered
        dataSource={dataSource.list}
        loading={dataSource.loading}
        columns={columns}
        pagination={{
          current: formData.page,
          pageSize: formData.limit,
          total: dataSource.total,
        }}
        onChange={handleTableChange}
      />
    </Card>
  )
}
