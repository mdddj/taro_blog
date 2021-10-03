import {ScrollView, View} from "@tarojs/components";
import * as React from "react";
// @ts-ignore
import Taro from "@tarojs/taro"
import {useReady} from "@tarojs/runtime";
import {useState} from "react";
import {ResCategory} from "dd_server_api/apis/model/ResCategory";
import {successResultHandle} from "dd_server_api/apis/utils/ResultUtil";
import {ResourceModel} from "dd_server_api/apis/model/ResourceModel";
import Api from "../../request";
import ViewLoading from "../../component/ViewLoading";
import {TaroVirtualList} from "taro-virtual-list";
import Post from "../../component/Post";



const ResourceListPage:React.FC = () => {


  const [category,setCategory] = useState<ResCategory>()
  const [page,setPage] = useState<number>(0)
  const [list,setList] = useState<ResourceModel[]>([])
  const [initLoading,setInitLoading] = useState<boolean>(true)


  /// 页面准备完毕
  useReady(async ()=>{
    const data = Taro.getCurrentInstance().preloadData
    let cate = data.category as ResCategory
    await Taro.setNavigationBarTitle({
      title: cate.name
    })
    setCategory(cate)
    await fetchData(cate)
    setInitLoading(false)
  })

  /// 加载数据
  const fetchData = async (cate:ResCategory) => {
   const response = await Api.instance().getResourcePostList({page: page, pageSize: 10}, {categoryId: cate.id} as any)
    successResultHandle(response,data => {
      let newList = list.concat(data.list)
      setList(newList)
    })
  }

  // 渲染列表Item
  const renderFunc = (item, index, pageIndex) => {
    return (
      <Post post={item} />
    )
  }


  const onPageScrollToLower = () => {
    // 执行分页数据请求
    console.log('正在请求下一页数据')
  }

  return  <View>
    {
      initLoading ?<ViewLoading />:<View>
        <TaroVirtualList autoScrollTop={false} list={list} listType='multi' pageNum={page+1} onRender={renderFunc} screenNum={2} segmentNum={10} scrollViewProps={{
          onScrollToLower: onPageScrollToLower,
        }}
        />
      </View>
    }
  </View>
}

export default ResourceListPage
