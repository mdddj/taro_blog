import {View} from "@tarojs/components";
import * as React from "react";
import {AtActivityIndicator} from "taro-ui";
// @ts-ignore
import Taro from "@tarojs/taro"
import "taro-ui/dist/style/components/activity-indicator.scss";
import 'taro-ui/dist/style/components/loading.scss';
import {useReady} from "@tarojs/runtime";
import {useState} from "react";
/// init loading 组件
const ViewLoading: React.FC = () => {


  const [windowHeight,setWindowHeight] = useState(100)
  const [windowWidth,setWindowWidth] = useState(100)

  useReady(async ()=>{
    await Taro.getSystemInfo({
      success: res => {
        setWindowHeight(res.windowHeight)
        setWindowWidth(res.windowWidth)
      }
    })
  })

  return <View style={{width:windowWidth,height:windowHeight,textAlign:'center',lineHeight: windowHeight}}>
    <AtActivityIndicator mode='center' />
  </View>
}


export default ViewLoading
