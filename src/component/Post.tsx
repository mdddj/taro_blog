import {Image, View, Text} from "@tarojs/components";
import * as React from "react";
import {AtAvatar} from "taro-ui";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/avatar.scss";
import { User } from "dd_server_api/apis/model/UserModel";
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
    <UserHeader user={post.user} />
    {post.content}
  </View>
}

export default Post



/// 图片类型
const ImagePost:React.FC<{post:ResourceModel}> = ({post}) => {
  return <View className='my-card'>
    <UserHeader user={post.user} />
    <Image src={post.content} style={{width: '100%'}} mode='widthFix' />
  </View>
}


/// 动态类型
const DynamicPost:React.FC<{post:ResourceModel}> = ({post}) => {
  return <View className='my-card'>
    <View>{post.content}</View>
  </View>
}

/// 动态头部
const UserHeader : React.FC<{user?: User}> = ({user}) => {
  if(!user){
    return  <View />
  }
  return <View className='at-row'>
    <AtAvatar className='at-col at-col-1 at-col--auto'  image={user.picture} circle size='small' />
    <Text className='at-col'>{user.nickName}</Text>
  </View>
}
