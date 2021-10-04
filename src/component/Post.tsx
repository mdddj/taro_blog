import {Image, View} from "@tarojs/components";
import * as React from "react";
import {ResourceModel} from "dd_server_api/apis/model/ResourceModel";

import './components.less'

/// 帖子
const Post:React.FC<{post: ResourceModel}> = ({post}) => {

  if(post.type=='image'){
    return  <ImagePost post={post} />
  }
  if(post.type=='dynamic'){
    return  <DynamicPost post={post} />
  }

  return <View className='my-card'>
    {post.content}
  </View>
}

export default Post



/// 图片类型
const ImagePost:React.FC<{post:ResourceModel}> = ({post}) => {
  return <View className='my-card'>
    <Image src={post.content} style={{width: '100%'}} mode={'widthFix'} />
  </View>
}


/// 动态类型
const DynamicPost:React.FC<{post:ResourceModel}> = ({post}) => {
  return <View className='my-card'>
    <View>{post.content}</View>
  </View>
}
