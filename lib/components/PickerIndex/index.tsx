import React, { Component } from 'react'
import { View, Button } from '@tarojs/components'

import ComPicker from '../ComPicker'
import dayjs from 'dayjs'

import './index.less'

type PageStateProps = {
  onEnd: Function
  start: string
  end: string
}


type PageOwnProps = {}

type PageState = {
  flag: boolean
}

type IProps = PageStateProps & PageOwnProps

interface PickerIndex {
  props: IProps
}

class PickerIndex extends Component {
  state = {
    isOpened: false,
    yearData: [],
    yearScroll: 0,
    monthScroll: 0,
    dayScroll: 0,
    checked: true,
    startEnd: 0,
    startTimer: dayjs(new Date()).subtract(1, 'month').format('YYYY-MM-DD'),
    endTimer: dayjs().format('YYYY-MM-DD'),
    startTimerMonth: '',
    IsEndtimeTipText: false,
    IsStarttimeTipText: false
  }
  componentDidMount() {
    const { start, end } = this.props
    if (start) {
      this.setState({
        startTimer: start,
        IsStarttimeTipText: false
      })
    }
    if (end) {
      this.setState({
        endTimer: end,
        IsEndtimeTipText: false
      })
    }
    const year = Number(dayjs().format('YYYY'))
    let i
    let yearArr = []
    for (i = 0; i <= 10; i++) {
      yearArr.push((year - i).toString())
    }
    this.setState({
      yearData: yearArr.reverse(),
    })
  }
  pickerIndexBar = (e = 0) => {
    const { onEnd } = this.props
    const { startTimer, endTimer } = this.state
    this.setState({
      startEnd: e,
    })
    if (!e) {
      this.setState({
        IsStarttimeTipText: false
      })
      onEnd(startTimer, endTimer)
    } else {
      this.setState({
        IsEndtimeTipText: false
      })
      onEnd(startTimer, endTimer)
    }
  }
  completeStartTimer = (val) => {
    const { onEnd } = this.props
    this.setState({
      startTimer: val,
    })
    onEnd(val, this.state.endTimer)
  }
  completeEndTimer = (val) => {
    const { onEnd } = this.props
    this.setState({
      endTimer: val,
    })
    onEnd(this.state.startTimer, val)
  }
  resetEmpty = () => {
    const { onEnd } = this.props
    const { startEnd } = this.state
    !startEnd ?  this.setState({
      startTimer: dayjs(new Date()).subtract(1, 'month').format('YYYY-MM-DD'),
    }) : this.setState({
      endTimer: dayjs().format('YYYY-MM-DD'),
    })
    onEnd('', '')
  }
  render() {
    const {
      yearData,
      startEnd,
      startTimer,
      endTimer,
    } = this.state
    const pickerIndexBarStatusLeft = !startEnd
      ? 'PickerIndex_bar_status'
      : 'PickerIndex_bar_time'
    const pickerIndexBarStatusRight = startEnd
      ? 'PickerIndex_bar_status'
      : 'PickerIndex_bar_time'
    return (
      <View className="PickerIndex">
       <View>
          <View className="PickerIndex_bar">
            <View
              className={pickerIndexBarStatusLeft}
              onClick={() => {
                this.pickerIndexBar(0)
              }}
            >
                {startTimer}
              </View>
            <View>至</View>
            <View
                className={pickerIndexBarStatusRight}
                onClick={() => {
                  this.pickerIndexBar(1)
                }}
              >
                {endTimer}
            </View>
          </View>
          {/* <View style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}><View className='at-icon at-icon-trash iconTrash' onClick={this.resetEmpty.bind(this)}></View></View> */}
        </View>
        {/**
         *  checked 判断是否按月或者按日
         *  startEnd 结束时间切换tab
         *  yearData 用户传入自定义年份
         *  initDate 根据时间确定滚动位置
         *
         */}
        
        {
          !startEnd ? <ComPicker
          initDate={startTimer}
          yearData={yearData}
          onEnd={this.completeStartTimer.bind(this)}
          /> :
          <ComPicker
            initDate={endTimer}
            yearData={yearData}
            onEnd={this.completeEndTimer.bind(this)}
          />
        }
        
      </View>
    )
  }
}

export default PickerIndex
