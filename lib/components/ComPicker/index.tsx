import { View } from '@tarojs/components'
import React, { Component } from 'react'
import Picker from '../Picker'
import dayjs from 'dayjs'
import './index.less'

interface typeProps {
  onEnd(e: string): void
  checked?: boolean
  yearData: Array<string>
  initDate: string
}
interface PageState {
  monthData: Array<string>
  dayData: Array<string>
  dayDataCopy: any
  startyear: string
  startmonth: string
  startday: string
  yearMonthDay: string
  yearMonth: string
}
class ComPicker extends Component<typeProps, PageState> {
  state = {
    startyear: dayjs().format('YYYY'),
    startmonth: dayjs().format('MM'),
    startday: dayjs().format('DD'),
    monthData: [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ],
    dayData: [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
    ],
    dayDataCopy: [],
    yearMonthDay: '',
    yearMonth: '',
  }
  componentDidMount() {
    const dayData = JSON.parse(JSON.stringify(this.state.dayData))
    this.setState(
      {
        dayDataCopy: ['', '', ...dayData.slice(0, dayjs().daysInMonth()), '', ''],
      })
  }
  getYearData = (e) => {
    const { startmonth } = this.state
    const [, Month, Day ] = this.props.initDate.split("-")
    this.setState({
      startyear: e,
    })
    const dayData = JSON.parse(JSON.stringify(this.state.dayData))
    this.setState(
      {
        dayDataCopy: ['', '', ...dayData.slice(
          0,
          dayjs(`${e}-${startmonth}`).daysInMonth()
        ), '', ''],
      },
      () => this.listenData(`${e}-${Month}-${Day}`)
    )
  }
  getMonthData = (e) => {
    this.setState({
        dayDataCopy: [],
    })
    const { startyear } = this.state
    const [Year, , Day ] = this.props.initDate.split("-")
    this.setState({
      startmonth: e,
    })
    const dayData = JSON.parse(JSON.stringify(this.state.dayData))
    this.setState(
      {
        dayDataCopy: ['', '', ...dayData.slice(0, dayjs(`${startyear}-${e}`).daysInMonth()), '', ''],
      },
      () => this.listenData(`${Year}-${e}-${Day}`)
    )
  }
  getDayData = (e) => {
    const [Year, Month] = this.props.initDate.split("-")
    this.setState(
      {
        startday: e,
      },
      () => this.listenData(`${Year}-${Month}-${e}`)
    )
  }
  listenData = (val) => {
    const { onEnd } = this.props
     if (this.state.yearMonthDay !== val) {
      onEnd(val)
      this.setState({ yearMonthDay: val })
     }
  }
  componentWillReceiveProps(nextProps) {
    const [Year, Month] = nextProps.initDate.split("-")
    const dayData = JSON.parse(JSON.stringify(this.state.dayData))
    this.setState(
      {
        dayDataCopy: ['', '', ...dayData.slice(0, dayjs(`${Year}-${Month}`).daysInMonth()), '', ''],
      })
  }
  render() {
    const { monthData, dayDataCopy } = this.state
    const { yearData } = this.props
    const [ Year, Month, Day ] = this.props.initDate.split("-")
    const yearScrollTop = yearData.findIndex((e) => Year === e.toString()) * 40
    const monthScrollTop = monthData.findIndex((e) => Month === e.toString()) * 40
    const dayScrollTop = this.state.dayData.findIndex((e) => Day === e.toString()) * 40
    return (
      <View className="BwPicker_box">
        <View className="selete_line_top">
         
        </View>
        <View className="selete_line_bottom">
          
        </View>
        <Picker
          initDate={
            yearScrollTop
          }
          getCount={this.getYearData.bind(this)}
          pickerData={['', '', ...yearData, '', '']}
        ></Picker>
        <Picker
          initDate={
            monthScrollTop
          }
          getCount={this.getMonthData.bind(this)}
          pickerData={['', '', ...monthData, '', '']}
        ></Picker>
        <Picker
          initDate={
            dayScrollTop
          }
          getCount={this.getDayData.bind(this)}
          pickerData={[...dayDataCopy]}
        ></Picker>
      </View>
    )
  }
}

export default ComPicker
