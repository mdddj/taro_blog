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

  return  <View>
    {
      initLoading ?<ViewLoading />:<ScrollView>

      </ScrollView>
    }
  </View>
}

export default ResourceListPage
