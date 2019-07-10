// 菜单结构示例，实际菜单数据是从接口获取的
const menu = [
  {
    index: '/index',
    icon: 'home',
    isIframe: 0,
    url: '',
    name: '首页',
    children: [],
  },
  {
    index: '/other',
    icon: 'shop',
    name: '导航菜单',
    isIframe: 0,
    url: '',
    children: [
      {
        index: '/other/p1',
        name: '页面1',
        isIframe: 0,
        url: '',
        children: [],
      },
      {
        index: '/other/p2',
        name: '页面2',
        isIframe: 0,
        url: '',
        children: [],
      },
    ],
  },
];

export default menu;
