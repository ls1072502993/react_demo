import { useState, useEffect } from 'react'
import { Form, Table, Button, Card, Select, InputNumber } from 'antd'
import type { TableProps } from 'antd'
import * as SystemApi from '@/api/system/index'

export default function App() {
  /********************************** 请求参数 **********************************/
  const [dataSource, setDataSource] = useState<Record<string, any>>({
    descriptionsItem: [],
    loading: false,
    list: [],
  })
  // 表格内修改列表数据
  function changeDataSource(key: string, value: any, rows: Record<string, any>) {
    setDataSource(values => ({
      ...values,
      list: values.list.map((v: any) => (v.name === rows.name ? { ...v, [key]: value } : v)) as any,
    }))
  }
  const columns: TableProps['columns'] = [
    {
      align: 'center',
      title: '奖项',
      dataIndex: 'name',
    },
    {
      align: 'center',
      title: '奖励类型',
      dataIndex: 'type',
      render: (text: any, rows: any) => (
        <Select
          value={text}
          className="w-[200px]"
          options={[
            { value: 0, label: '谢谢参与' },
            { value: 1, label: '钻石' },
            { value: 2, label: '免费次数' },
          ]}
          onChange={e => changeDataSource('type', e, rows)}
        />
      ),
    },
    {
      align: 'center',
      title: '奖励值',
      dataIndex: 'amount',
      render: (text: any, rows: any) => (
        <InputNumber value={text} className="w-[200px]!" onChange={e => changeDataSource('amount', e, rows)} />
      ),
    },
    {
      align: 'center',
      title: '比例',
      dataIndex: 'percent',
      render: (text: any, rows: any) => (
        <InputNumber value={text} className="w-[200px]!" onChange={e => changeDataSource('percent', e, rows)} />
      ),
    },
  ]
  /********************************** 获取表格数据 **********************************/
  useEffect(() => {
    getTableList()
  }, [])
  async function getTableList() {
    setDataSource(values => ({
      ...values,
      loading: true,
    }))
    // 获取表格数据
    const { data: tableData } = (await SystemApi.settingDetail({ key: 'lucky_egg_config' })) as any
    setDataSource(values => ({
      ...values,
      loading: false,
      list: tableData,
    }))
  }
  /********************************** 查询数据 **********************************/
  function onFinish() {
    SystemApi.settingSave({
      key: 'lucky_egg_config',
      values: dataSource.list,
    }).then(() => getTableList())
  }
  return (
    <Card>
      <Form layout="inline" onFinish={onFinish}>
        <div className="flex items-center justify-center">
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <div className="text-[red] ml-[10px]">所有奖项比例加起来必须为100%</div>
        </div>
      </Form>
      <Table
        className="mt-[10px]"
        rowKey="name"
        bordered
        dataSource={dataSource.list}
        loading={dataSource.loading}
        columns={columns}
        pagination={false}
      />
    </Card>
  )
}
