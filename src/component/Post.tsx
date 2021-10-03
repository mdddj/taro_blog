import {Image, View} from "@tarojs/components";
import * as React from "react";
import {ResourceModel} from "dd_server_api/apis/model/ResourceModel";

import '../app.less'

/// 帖子
const Post:React.FC<{post: ResourceModel}> = ({post}) => {

  if(post.type=='image'){
    return  <ImagePost post={post} />
  }

  return <View className='my-card'>
    {post.content}
  </View>
}

export default Post




const ImagePost:React.FC<{post:ResourceModel}> = ({post}) => {
  return <View className='my-card'>
    <Image src={post.content} />
  </View>
}
