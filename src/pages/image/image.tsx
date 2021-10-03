import {View, Text} from "@tarojs/components";
import * as React from "react";
import {useReady} from "@tarojs/runtime";
// @ts-ignore
import Taro from '@tarojs/taro'
// @ts-ignore
import VirtualList from '@tarojs/components/virtual-list'
import "taro-ui/dist/style/components/avatar.scss";
import "taro-ui/dist/style/components/flex.scss";
import {AtAvatar} from "taro-ui";
import {PagerModel, successResultHandle} from "dd_server_api/apis/utils/ResultUtil";
import {ResCategory} from "dd_server_api/apis/model/ResCategory";

import {useState} from "react";
import Api from "../../request";
import './image.less'




const Row = React.memo<any>(({id, index, style, data}) => {
  const item = data[index]
  return (
    <View id={id} style={{marginBottom:12,...style}} className='my-card'>
      <View className='at-row at-row__align--center'>
        <View className='at-col at-col-1 at-col--auto '>
          <AtAvatar image={item.logo} size='small' circle />
        </View>
        <View className='at-col' style={{marginLeft: 12}}> <Text className='my-card-title'>{item.name}</Text></View>
      </View>

    </View>
  );
})

const ImagePage: React.FC = () => {


  const [list, setList] = useState<ResCategory[]>([])
  const [initLoading, setInitLoading] = useState<boolean>(true)
  const [screenHeight, setScreenHeight] = useState<number>(1000)
  const [nextLoading, setNextLoading] = useState<boolean>(false)
  const [page,setPage] = useState<number>(0)
  const [noMore,setNoMore] = useState<boolean>(false)

  /// 页面启动完成执行函数
  useReady(async () => {
    await getWindowHeight()
    const response = await Api.instance().getResourceCategoryList({pageSize: 100, page: page}, {type: 'images'} as any)
    successResultHandle<{ page: PagerModel, list: ResCategory[] }>(response, data => {
      setList(data.list)
      hasNoMore(data.page)
    })
    setInitLoading(false)
  })


  const getWindowHeight = async () => {
    await Taro.getSystemInfo({
      success: res => {
        console.log(res)
        setScreenHeight(res.windowHeight)
      }
    })
  }


  const fetchNextPage = () => {
    setNextLoading(true)
    let nextPage = page + 1;
    setPage(nextPage)
    Api.instance().getResourceCategoryList({pageSize:10,page:nextPage},{type:'images'} as any).then(value => {
      setNextLoading(false)
      successResultHandle(value,data => {
        list.concat(...list,data.list)
        setList(list)
        hasNoMore(data.page)
      })
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const hasNoMore = (page: PagerModel) => {
    setNoMore(page.paged)
  }

  if (initLoading) {
    return <View>
      加载中
    </View>
  }
  console.log(noMore)

  return <View>
    <VirtualList
      height={screenHeight- (noMore ?  64 : 0)} /* 列表的高度 */
      width='100%' /* 列表的宽度 */
      itemData={list} /* 渲染列表的数据 */
      itemCount={list.length} /*  渲染列表的长度 */
      itemSize={72}
      onScroll={({ scrollDirection, scrollOffset }) => {
        if (
          // 避免重复加载数据
          !nextLoading &&
          // 只有往前滚动我们才触发
          scrollDirection === 'forward' && !noMore &&
          // 5 = (列表高度 / 单项列表高度)
          // 100 = 滚动提前加载量，可根据样式情况调整
          scrollOffset > ((list.length - 5) * 72 + 100)
        ) {
          fetchNextPage()
        }
      }}
    >
      {Row}
    </VirtualList>
    {
      noMore && <View style={{height:64,textAlign:"center",color:'grey',fontSize: 12}}>
        全部加载完毕
      </View>
    }
  </View>
}
export default ImagePage
