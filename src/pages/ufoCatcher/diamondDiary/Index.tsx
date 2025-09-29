import { useState, useEffect } from 'react'
import { Form, Table, Button, Card, Input, Select } from 'antd'
import type { TableProps } from 'antd'
import * as LotteryApi from '@/api/ufoCatcher/diamondDiary'
import * as LotteryCommonApi from '@/api/ufoCatcher/common'
import RangePicker from '@/components/RangePicker/Index'

export default function App() {
  /********************************** 请求参数 **********************************/
  const [sceneList, setSceneList] = useState<Record<string, any>[]>([])
  useEffect(() => {
    LotteryCommonApi.getSceneList().then(res => {
      setSceneList([
        { label: '全部', value: '' },
        ...res.data.map((v: any) => ({
          label: v.name,
          value: v.value,
        })),
      ])
    })
  }, [])
  const [formData, setFormData] = useState({
    page: 1,
    limit: 10,
    search: '',
    start_time: '',
    end_time: '',
    scene: '',
  })
  const [dataSource, setDataSource] = useState({
    loading: false,
    list: [],
    total: 0,
  })
  const columns: TableProps['columns'] = [
    { align: 'center', title: '排序', render: (_1, _2, index) => index + 1 },
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
    { align: 'center', title: '变动前', dataIndex: 'before_value' },
    { align: 'center', title: '变动值', dataIndex: 'value' },
    { align: 'center', title: '变动后', dataIndex: 'after_value' },
    { align: 'center', title: '描述', dataIndex: 'describe' },
    { align: 'center', title: '备注', dataIndex: 'remark' },
    { align: 'center', title: '创建时间', dataIndex: 'created_at' },
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
    setDataSource(values => ({
      ...values,
      loading: false,
      list: tableData.data,
      total: tableData.total,
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
      start_time: formValues.dates[0] || '',
      end_time: formValues.dates[1] || '',
    }))
  }
  return (
    <Card>
      <Form layout="inline" onFinish={onFinish}>
        <Form.Item label="会员ID" name="search" className="mb-[10px]!">
          <Input />
        </Form.Item>
        <Form.Item label="奖券变动场景" name="scene" className="mb-[10px]!">
          <Select className="w-[250px]!" options={sceneList} />
        </Form.Item>
        <Form.Item label="变动时间" name="dates" className="mb-[10px]!">
          <RangePicker />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="mb-[10px]!">
          查询
        </Button>
      </Form>
      <Table
        className="mt-[10px]"
        rowKey="log_id"
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
