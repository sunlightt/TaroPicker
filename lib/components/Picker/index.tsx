import React, { Component } from "react";
import { View, ScrollView, Text } from "@tarojs/components";
import "./index.less";
type PageStateProps = {
  pickerData: Array<string>
  getCount(e: string): void
  initDate: number
  dayInmnth?: number | undefined
};

type PageState = {
  pvcDesDom: {
    scrollHeight: number;
    clientHeight: number;
    childNodes: object;
  };
  childListDom: any
  scrollTop: number
  pickerDataLength: number
  init: number
  innerHTML: string
};
class Picker extends Component<PageStateProps, PageState> {
  state = {
    init: 0,
    rollerLi: 40,
    pvcDesDom: {
      scrollHeight: 0,
      clientHeight: 0,
      childNodes: [],
    },
    childListDom: [],
    scrollTop: 40,
    pickerDataLength: 0,
    innerHTML: ''
  };
  pvcDesDom = React.createRef();
  componentDidMount() {
    this.getChildNodes()
  }
  getChildNodes = () => {
    const childNodes = this.pvcDesDom.current.childNodes;
    const childLength = childNodes.length;
    let childList = [];
    for (let i = 0; i < childLength; i++) {
      if (childNodes[i].nodeType === 1 && childNodes[i].childNodes) {
        childList.push(childNodes[i]);
      }
    }
    this.setState({
      childListDom: [...childList],
    });
  }
  onScroll = (e) => {
    
    // 用户选中的时间
    try {
        const { childListDom, pickerDataLength } = this.state;
        const { getCount, pickerData } = this.props;
        if (pickerDataLength !== pickerData.length) {
          this.getChildNodes()
          this.setState({
            pickerDataLength: pickerData.length
          })
        }
        // scrollTop / 日期宽度 = 当前选中的日期
        const count = Math.floor(
          e.detail.scrollTop /
            this.state.rollerLi
        );
        if (childListDom[count].textContent !== this.state.innerHTML) {
          this.setState({
            innerHTML: childListDom[count+2].textContent
          })
          getCount(childListDom[count+2].textContent)
        }
    } catch (err) {
      console.log(err);
    }
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      init: nextProps.initDate
    })
  }
  render() {
    const scrollStyle = {
      height: "200Px",
    };
    const { pickerData } = this.props;
    return (
      <View className="Roller">
        <View className="roller_wrapper">
          <ScrollView
            scrollY
            style={scrollStyle}
            // scrollTop={this.state.init}
            className="roller"
            onScroll={this.onScroll.bind(this)}
            ref={this.pvcDesDom}
          >
            {pickerData.map((e, index) => (
              <View key={index} className="roller_li">
                <Text>{e}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Picker;
