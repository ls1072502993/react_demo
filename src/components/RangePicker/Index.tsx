import { DatePicker } from 'antd'
import type { GetProps } from 'antd'
import type { PropsWithChildren } from 'react'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const { RangePicker } = DatePicker

type DefaultValue = Dayjs | null | undefined

type PropsValue = DefaultValue | string

type TimeRangePickerProps = GetProps<typeof RangePicker>

const rangePresets: TimeRangePickerProps['presets'] = [
  { label: '今天', value: [dayjs(), dayjs()] },
  { label: '最近7天', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: '最近14天', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: '最近30天', value: [dayjs().add(-30, 'd'), dayjs()] },
]

export type RangePickerProps = Omit<TimeRangePickerProps, 'onChange' | 'value'> & {
  onChange?: (dates: [PropsValue, PropsValue]) => void
  value?: [PropsValue, PropsValue] | undefined
}

export default function App(props: PropsWithChildren<RangePickerProps>) {
  const onRangeChange: TimeRangePickerProps['onChange'] = (_, dates) => {
    let _dates: any = []
    if (!dates) {
      _dates = [null, null]
    } else {
      if (props.showTime) {
        _dates = dates
      } else {
        _dates = [dates[0] ? `${dates[0]} 00:00:00` : '', dates[1] ? `${dates[1]} 23:59:59` : '']
      }
    }
    props?.onChange?.(_dates)
  }
  const resetValue = (): [DefaultValue, DefaultValue] => {
    const { value: [startTime, endTime] = [] } = props

    function _getValue(val: PropsValue) {
      let _fnValue
      if (val && typeof val === 'string') {
        _fnValue = dayjs(val)
      } else if (dayjs.isDayjs(val)) {
        _fnValue = val
      }
      return _fnValue
    }

    return [_getValue(startTime), _getValue(endTime)]
  }
  return <RangePicker {...props} presets={rangePresets} onChange={onRangeChange} value={resetValue()} />
}
