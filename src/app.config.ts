export default {
  pages: [
    'pages/index/index',
    'pages/user/user',
    'pages/image/image',
    'pages/category/category',
    'pages/resource/resource'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [{
      iconPath: 'res/home.png',
      selectedIconPath: 'res/home-filling.png',
      pagePath: 'pages/index/index',
      text: '首页',
    },
      {
        iconPath: 'res/folder.png',
        selectedIconPath: 'res/folder-filling.png',
        pagePath: 'pages/category/category',
        text: '分类'
      },
      {
        iconPath: 'res/image.png',
        selectedIconPath: 'res/image-fill.png',
        pagePath: 'pages/image/image',
        text: '相册'
      },
      {
        iconPath: 'res/user.png',
        selectedIconPath: 'res/user-filling.png',
        pagePath: 'pages/user/user',
        text: '我的'
      }
    ],
    'color': '#000',
    'selectedColor': '#56abe4',
    'backgroundColor': '#fff',
    'borderStyle': 'white',
  },
}
