
import * as React from "react";
import {useState} from "react";
import {BlogData, BlogListData} from "dd_server_api/apis/model/result/BlogPushNewResultData";
import {successResultHandle} from "dd_server_api/apis/utils/ResultUtil";
import {usePullDownRefresh, useReady} from "@tarojs/runtime";
import {ScrollView, View} from '@tarojs/components'
import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'
import Api from "../../request";





const Index:React.FC = () => {


  const [blogs,setBlogs] = useState<BlogData[]>([])


  const fetchBlog = async (page: number) => {
   const response =await Api.instance().getBlogList(page,10)
    successResultHandle<BlogListData>(response,data => {
      setBlogs(data.list)
    })
  }

  useReady(async ()=>{
    await fetchBlog(1)
  })


  usePullDownRefresh(async ()=>{
    await fetchBlog(1)
    console.log('刷新完成')
  })


  return <ScrollView>
    {
      blogs.map(value => {
        return <View key={value.id} className={'blog'}>
          <View className={'blog-title'}>{value.title}</View>
          <View className={'blog-content'}>{value.content.substring(0,50)}</View>
        </View>
      })
    }
  </ScrollView>
}

export default Index

