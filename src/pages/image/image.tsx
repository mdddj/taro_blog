import {View, Text} from "@tarojs/components";
import * as React from "react";
import {usePullDownRefresh, useReady} from "@tarojs/runtime";
// @ts-ignore
import Taro from '@tarojs/taro'
// @ts-ignore
import VirtualList from '@tarojs/components/virtual-list'
import {AtAvatar} from "taro-ui";
import {PagerModel, successResultHandle} from "dd_server_api/apis/utils/ResultUtil";
import {ResCategory} from "dd_server_api/apis/model/ResCategory";
import "taro-ui/dist/style/components/avatar.scss";
import {useState} from "react";
import Api from "../../request";
import './image.less'
import ViewLoading from "../../component/ViewLoading";




const Row = React.memo<any>(({id, index, style, data}) => {
  const item = data[index] as ResCategory
  return (
    <View id={id} style={{marginBottom:12,...style}} className='my-card' onClick={async ()=>{
      Taro.preload('category',item)
      await Taro.navigateTo({url: '/pages/resource/resource?id=' + item.id})
    }}
    >
      <View className='at-row at-row__align--center'>
        <View className='at-col at-col-1 at-col--auto '>
          <AtAvatar image={item.logo} size='small' circle />
        </View>
        <View className='at-col' style={{marginLeft: 12}}> <Text className='my-card-title'>{item.name}</Text></View>
      </View>

    </View>
  );
})

const pageSize = 10;

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
    const response = await Api.instance().getResourceCategoryList({pageSize: pageSize, page: page},)
    successResultHandle<{ page: PagerModel, list: ResCategory[] }>(response, data => {
      setList(data.list)
      hasNoMore(data.page)
    })
    setInitLoading(false)
  })


  usePullDownRefresh(()=>{
    console.log('下拉刷新')
  })

  const getWindowHeight = async () => {
    await Taro.getSystemInfo({
      success: res => {
        setScreenHeight(res.windowHeight)
      }
    })
  }


  /// 加载下一页
  const fetchNextPage = () => {
    setNextLoading(true)
    let nextPage = page + 1;
    setPage(nextPage)
    Api.instance().getResourceCategoryList({pageSize:pageSize,page:nextPage}).then(value => {
      setNextLoading(false)
      successResultHandle(value,data => {
        let newList = list.concat(data.list)
        setList(newList)
        hasNoMore(data.page)
      })
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const hasNoMore = (page: PagerModel) => {
    setNoMore(page.paged)
  }

  if (initLoading) {
    return <ViewLoading />
  }

  return <View>
    <VirtualList
      height={screenHeight- (noMore ?  30 : 0)} /* 列表的高度 */
      width='100%' /* 列表的宽度 */
      itemData={list} /* 渲染列表的数据 */
      itemCount={list.length} /*  渲染列表的长度 */
      itemSize={72}
      onScroll={({ scrollDirection, scrollOffset }) => {
        if (
          !nextLoading &&
          scrollDirection === 'forward' && !noMore &&
          scrollOffset > ((list.length - 5) * 72 + 100)
        ) {
          fetchNextPage()
        }
      }}
    >
      {Row}
    </VirtualList>
    {
      noMore && <View style={{height:30,textAlign:"center",color:'grey',fontSize: 12,background: '#f7f7f7',lineHeight: '30px'}}>
        <Text>全部加载完毕</Text>
      </View>
    }
  </View>
}
export default ImagePage
