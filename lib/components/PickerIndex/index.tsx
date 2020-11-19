import React, { Component } from "react";
import { View, Button } from "@tarojs/components";

import ComPicker from "../ComPicker";
import dayjs from "dayjs";

import "./index.less";

type PageStateProps = {
  getDateList(e:Array<string>):void
};

type PageDispatchProps = {
  add: () => void;
  dec: () => void;
  asyncAdd: () => any;
};

type PageOwnProps = {};

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface PickerIndex {
  props: IProps;
}

class PickerIndex extends Component {
  state = {
    isOpened: false,
    yearData: [
      "1994",
      "1995",
      "1996",
      "1997",
      "1998",
      "1999",
      "2000",
      "2001",
      "2002",
      "2003",
      "2004",
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "2011",
      "2012",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
    ],
    yearScroll: 0,
    monthScroll: 0,
    dayScroll: 0,
    checked: false,
    startEnd: true,
    startTimer: '开始时间',
    endTimer: '结束时间',
    initDate: '',
    startTimerMonth: ''
  };
  handleChange = () => {
    this.setState({
      checked: !this.state.checked
    })
  }
  pickerIndexBar = (e = 1) => {
    const { startTimer, endTimer } = this.state
    if (e === 1 && startTimer !== '开始时间') {
      this.setState({
        initDate: startTimer
      })
    } else if (e === 2 && endTimer !== '结束时间') {
      this.setState({
        initDate: endTimer
      })
    } else {
      this.setState({
        initDate: startTimer
      })
    }
    this.setState({
      startEnd: e === 1 ? true : false
    })
  }
  complete = (val) => {
    const { startEnd, checked } = this.state
    console.log(val)
    if (checked) {
      startEnd ? this.setState({
        startTimer: val,
      }) : this.setState({
        endTimer: val,
      })
    } else {
      this.setState({
        startTimerMonth: val
      })
    }
  }
  
  
  render() {
    const {
      yearData,
      checked,
      startEnd,
      startTimer,
      startTimerMonth,
      endTimer,
      initDate,
    } = this.state;
    const pickerIndexBarStatusLeft = startEnd ? 'PickerIndex_bar_status' : undefined
    const pickerIndexBarStatusRight = !startEnd ? 'PickerIndex_bar_status' : undefined
    return (
      <View className="PickerIndex">
        <View className="pickerIndex_header">
          <View>
            <Button size='mini' onClick={this.handleChange.bind(this)} className="pickerIndex_header_complete">{ checked ? '按日选择' : '按月选择' }</Button>
          </View>
          <View>
            {/* <Button size='mini' onClick={this.complete.bind(this)} className="pickerIndex_header_complete">完成</Button> */}
          </View>
        </View>
        <View className="PickerIndex_bar">
          <View className={pickerIndexBarStatusLeft} onClick={() => {this.pickerIndexBar(1)}}>
            {  checked ? startTimer : startTimerMonth }
          </View> 
          {
            checked ? (<View>至</View>) : null
          }
          {
            checked ? (
              <View className={pickerIndexBarStatusRight} onClick={() => { this.pickerIndexBar(2) }}>
                {endTimer}
              </View>
              ) : null
          }
        </View>
        {
          /**
           *  checked 判断是否按月或者按日
           *  startEnd 结束时间切换tab
           *  yearData 用户传入自定义年份
           *  initDate 根据时间确定滚动位置
           *  
          */
        }
        <ComPicker initDate={initDate} yearData={yearData} startEnd={startEnd} checked={checked} onEnd={this.complete.bind(this)} />
      </View>
    );
  }
}

export default PickerIndex;
