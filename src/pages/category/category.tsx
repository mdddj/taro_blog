import {Component} from 'react'
import {AtList, AtTabs, AtTabsPane} from 'taro-ui'
import {View} from '@tarojs/components'
import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";
import './category.less'

export default class CategoryIndex extends Component {

  state = {
  }

  /// 在这里请求服务器数据
  async componentDidMount() {
  }

  handleClick(value) {
    this.setState({
      current: value
    })
  }

  render() {
    return (
      <View className='index'>
      </View>
    )
  }
}
