import { View } from '@tarojs/components';
import React, { Component } from 'react';
import Picker from '../Picker';
import dayjs from "dayjs";
import "./index.less";

interface typeProps {
  onEnd(e: string): void
  checked?: boolean
  startEnd?: boolean
  yearData: Array<string>
  initDate: string
}
interface PageState {
  yearScroll: number
  monthScroll: number
  monthData: Array<string>
  dayScroll: number
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
    startyear: dayjs().format("YYYY"),
    startmonth: dayjs().format("MM"),
    startday: dayjs().format("DD"),
    yearScroll: 0,
    monthScroll: 0,
    monthData: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ],
    dayScroll: 0,
    dayData: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
    ],
    dayDataCopy: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
    ].slice(0, dayjs().daysInMonth()),
    yearMonthDay: '',
    yearMonth: ''
  }
  componentDidMount() {
    const { yearData } = this.props
    this.setState({
      yearScroll:
        yearData.findIndex((e) => dayjs().format("YYYY") == e) * 60,
      monthScroll:
        this.state.monthData.findIndex((e) => dayjs().format("MM") == e) * 60,
      dayScroll:
        this.state.dayData.findIndex((e) => dayjs().format("DD") == e) * 60,
    });
  }
  getYearData = e => {
    const { startmonth } = this.state
    this.setState({
      startyear: e,
    });
    const dayData = JSON.parse(JSON.stringify(this.state.dayData))
    this.setState({
      dayDataCopy: dayData.slice(0, dayjs(`${e}-${startmonth}`).daysInMonth())
    }, () => this.listenData())
  }
  getMonthData = e => {
    const { startyear } = this.state
    this.setState({
      startmonth: e,
    });
    
    const dayData = JSON.parse(JSON.stringify(this.state.dayData))
    this.setState({
      dayDataCopy: dayData.slice(0, dayjs(`${startyear}-${e}`).daysInMonth())
    }, () => this.listenData())
  }
  getDayData = e => {
    this.setState({
      startday: e,
    },() => this.listenData());
    
  }

  listenData = () => {
    const { startyear, startmonth, startday, yearMonthDay, yearMonth } = this.state
    const { onEnd, checked } = this.props
    // checked === false : 月份选择器
    if (!checked && yearMonth !== `${startyear}-${startmonth}`) {
      console.log(`${startyear}-${startmonth}`)
      onEnd(`${startyear}-${startmonth}`)
      this.setState({ yearMonth: `${startyear}-${startmonth}` })
    // checked === false : 日期选择器
    } else if (checked && yearMonthDay !== `${startyear}-${startmonth}-${startday}`) {
      onEnd(`${startyear}-${startmonth}-${startday}`)
      this.setState({yearMonthDay : `${startyear}-${startmonth}-${startday}`})
    }
  }
  render() {
    const { checked=true } = this.props
    const { yearScroll, monthScroll, monthData, dayScroll, dayDataCopy, dayData } = this.state
    const { yearData } = this.props
    return (
      <View className="BwPicker_box">
        <View className="selete_line">
          <View className="selete_line_li"></View>
          {
            checked ? (
              <View className="selete_line_li"></View>
            ) : null
          }
          <View className="selete_line_li"></View>
        </View>
        <Picker
            initDate={yearScroll}
            getCount={this.getYearData.bind(this)}
            pickerData={yearData}
        ></Picker>
        <Picker
            initDate={monthScroll}
            getCount={this.getMonthData.bind(this)}
            pickerData={monthData}
        ></Picker>
        {
          checked ? (
            <Picker
              initDate={dayScroll}
              getCount={this.getDayData.bind(this)}
              pickerData={dayDataCopy}
            ></Picker>
          ) : null
        }
        
      </View>
    );
  }
}

export default ComPicker;