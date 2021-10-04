import {View} from "@tarojs/components";
import * as React from "react";
import {useRef, useState} from "react";
// @ts-ignore
import Taro from "@tarojs/taro"
import {useReady} from "@tarojs/runtime";
import {ResCategory} from "dd_server_api/apis/model/ResCategory";
import {successResultHandle} from "dd_server_api/apis/utils/ResultUtil";
import {ResourceModel} from "dd_server_api/apis/model/ResourceModel";
import {AtActivityIndicator} from "taro-ui";
import Api from "../../request";
import ViewLoading from "../../component/ViewLoading";
import VirtualList from "../../component/VirtualList";
import Post from "../../component/Post";
import './resource.less'



const ResourceListPage: React.FC = () => {


  const [category, setCategory] = useState<ResCategory>()
  const [page, setPage] = useState<number>(0)
  const [list, setList] = useState<ResourceModel[]>([])
  const [initLoading, setInitLoading] = useState<boolean>(true)
  const [height,setHeight] = useState<number>(700)
  const [width,setWidth] = useState<number>(428)
  const [noMore,setNoMore] = useState<boolean>(false) // 是否还存在下一页
  const [nextLoading,setNextLoading] = useState<boolean>(false)

  /// 页面准备完毕
  useReady(async () => {
    const data = Taro.getCurrentInstance().preloadData
    let cate = data.category as ResCategory
    await Taro.setNavigationBarTitle({
      title: cate.name
    })
    const info = await Taro.getSystemInfo()
    setHeight(info.windowHeight)
    setWidth(info.windowWidth)
    setCategory(cate)
    await fetchData(cate,0)
    setInitLoading(false)
  })


  /// 加载数据
  const fetchData = async (cate: ResCategory,p: number) => {
    if(page!=0){
      setNextLoading(true)
    }
    const response = await Api.instance().getResourcePostList({page: p, pageSize: 10}, {categoryId: cate.id} as any)
    successResultHandle(response, data => {
      let dataList = data.list;
      setList(dataList)
      setNoMore(data.page.paged)
    })
    setNextLoading(false)
  }



  // 渲染列表Item
  const renderFunc = (item, index, pageIndex) => {
    return (
      <View className='row-item'>
        <Post post={item} />
      </View>
    )
  }


  // 加载下一页
  const onPageScrollToLower = async  () => {
    if(noMore){
      console.log('没有更多了')
      return
    }
    // 执行分页数据请求
    let p = page + 1
    setPage(p)
    await fetchData(category, p)
  }


  return <View>
    {
      initLoading ? <ViewLoading /> : <View style={{height:height}}>
        <VirtualList autoScrollTop={false} list={list} onRenderLoad={()=>{
          if(!noMore && nextLoading){
            return <AtActivityIndicator />
          }
        }} onRenderBottom={()=>{
          if(noMore){
            return <View style={{textAlign:"center",lineHeight: '50px',height:50}}>没有更多了</View>
          }
        }} listType='multi' style={{height:'100%'}} pageNum={page + 1} onRender={renderFunc} screenNum={2} segmentNum={10} scrollViewProps={{
          onScrollToLower: onPageScrollToLower,
        }}

        />
      </View>
    }
  </View>
}

export default ResourceListPage
