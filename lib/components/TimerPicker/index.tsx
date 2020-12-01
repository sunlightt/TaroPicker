import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import dayjs from 'dayjs'
import Picker from '../PickerIndex'
import './index.less'


const TimerPicker = (props) => {
    const { getValue = () => { }, selectorChecked="申请日期", start, end } = props;
    const [maskShow, setMaskShow] = useState(false)
    const [startTimer, setStartTimer] = useState('')
    const [endTimer, setEndTimer] = useState('')
    const [timerStr, setTimerStr] = useState('')
    const panelPop = () => {
        setMaskShow(!maskShow)
    }
    const onEnd = (startTimer, endTimer) => {
        let timerStr = ''
        if (dayjs(startTimer).isBefore(dayjs(endTimer))) {
            timerStr = `${startTimer}至${endTimer}`
        } else {
            if (dayjs(startTimer).isSame(dayjs(endTimer))) {
                timerStr = `${startTimer}`
            } else {
                timerStr = `${endTimer}至${startTimer}`
            }
        }
        if (!startTimer && !endTimer) {
            timerStr = ''
        } else if (startTimer && !endTimer) {
            timerStr = `从${startTimer}开始`
        } else if (!startTimer && endTimer) {
            timerStr = `到${endTimer}为止`
        }
        setStartTimer(startTimer)
        setEndTimer(endTimer)
        setTimerStr(timerStr)
    }
    const cancelChange = () => {
        setMaskShow(false)
    }
    const ensureChange = () => {
        setMaskShow(false)
        getValue({
            startTimer,
            endTimer,
            timerStr
        })
    }
    const { bottomHeight } = props
    const styleBottom = {
        bottom: '0px'
    }
    return (
        <View className="timerPickerContainer">
        <View className='nameOfTitle' onClick={panelPop}><Text className="nameOfTitle_text">{ selectorChecked }</Text><View className='at-icon at-icon-chevron-down iconStyle'></View></View>
        {/* 灰色遮罩层 */}
            {maskShow ? <View className='mask' onClick={panelPop}></View> : ''}
            {
                maskShow ? (
               <View className='pickerCustom' style={bottomHeight ? styleBottom : {}} >
                <View className='pickerCustom_hd'>
                    <View className='pickerCustom_action' onClick={cancelChange}>取消</View>
                    <View className='pickerCustom_action' onClick={ensureChange}>确定</View>
                 </View>
                <View className='pickerCustom_bd'>
                 <Picker start={start} end={end} onEnd={onEnd} />
              </View>
            </View>
            ) : null
            }
            
        </View>
    )
}

export default TimerPicker