import type { FormProps } from 'antd'
import { Button, Form, Input, Card } from 'antd'
import * as UserApi from '@/api/user/index'
import { useNavigate } from 'react-router'
import { useUserStore } from '@/store/index'

interface FieldType {
  username?: string
  password?: string
  code?: string
}

const initialValues: FieldType = {
  username: 'admin10004',
  password: 'Ld@20250805',
  code: 'DDldkj@0507',
}

export default function App() {
  const [form] = Form.useForm()
  const { getUserInfo } = useUserStore()
  const navigate = useNavigate()

  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    const loginData: any = await UserApi.login(values)
    localStorage.setItem('token', loginData.data.token)
    localStorage.setItem('storeid', loginData.data.storeId)
    await getUserInfo()
    navigate('/home')
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="w-[100%] h-[100%] flex items-center justify-center bg-[#f5f5f5]">
      <Card className="w-[500px]!" title="登录">
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="验证码" name="code" rules={[{ required: true, message: '请输入验证码' }]}>
            <Input />
          </Form.Item>
          <Form.Item label={null} style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
