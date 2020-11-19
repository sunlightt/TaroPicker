import React, { Component } from "react";
import { View, ScrollView } from "@tarojs/components";
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
};
class Roller extends Component<PageStateProps, PageState> {
  state = {
    rollerLi: 60,
    pvcDesDom: {
      scrollHeight: 0,
      clientHeight: 0,
      childNodes: [],
    },
    childListDom: [],
    scrollTop: 60,
    pickerDataLength: 0
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
      if (childNodes[i].nodeType === 1 && childNodes[i].innerHTML) {
        childList.push(childNodes[i]);
      }
    }
    this.setState({
      childListDom: [...childList],
    });
  }
  onScroll = (e) => {
    const { childListDom, pickerDataLength } = this.state;
    const { getCount, pickerData } = this.props;
    if (pickerDataLength !== pickerData.length) {
      this.getChildNodes()
      this.setState({
        pickerDataLength: pickerData.length
      })
    }
    /**
     * 当前可视 / 日期宽度 / 2 = 得到选中区域到可视区域顶端距离
    */
    const surplus = Math.floor(
      this.pvcDesDom.current.clientHeight / this.state.rollerLi / 2
    );
    // scrollTop / 日期宽度 = 当前选中的日期
    const count = Math.floor(
      e.detail.scrollTop /
        this.state.rollerLi
    );
    // 判断用户向上滑动还是向下滑动
    // const direction = e.detail.scrollTop-this.state.scrollTop
    /**
     * 向上取整当用于滑动的时候提前将下一个元素改变颜色
    */
    // const countCeil = Math.ceil(
    //   (surplus * this.state.rollerLi -
    //     surplus * this.state.rollerLi +
    //     e.detail.scrollTop) /
    //     this.state.rollerLi
    // )
    // childListDom[countCeil].setAttribute("style", "font-weight: blob; font-size: 30Px; color: #FF6538")
    // if (countCeil > 0) {
    //   childListDom[countCeil - 1].setAttribute("style", "font-weight: 100;")
    // }
    // if (countCeil + 1 < this.props.pickerData.length) {
    //   childListDom[countCeil + 1].setAttribute("style","font-weight: 100;")
    // }
    // 用户选中的时间
    getCount(childListDom[count].innerHTML)
    this.setState({
      scrollTop: e.detail.scrollTop
    })
  };

  render() {
    const scrollStyle = {
      height: "180Px",
    };
    const Threshold = 20;
    const { initDate, pickerData } = this.props;
    return (
      <View className="Roller">
        <View className="roller_wrapper">
          <ScrollView
            scrollY
            scrollWithAnimation
            lowerThreshold={Threshold}
            upperThreshold={Threshold}
            style={scrollStyle}
            scrollTop={initDate}
            className="roller"
            onScroll={this.onScroll}
            ref={this.pvcDesDom}
          >
            <View className="roller_li"></View>
            {pickerData.map((e) => (
              <View key={e} className="roller_li">
                {e}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Roller;
