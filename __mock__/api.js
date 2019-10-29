module.exports = {
  'POST /api/menus': {
    code: 200,
    message: 'success',
    data: [
      {
        index: '/',
        icon: 'home',
        name: '首页',
        isIframe: 0,
        children: [],
      },
      {
        index: '/biz',
        icon: 'database',
        isIframe: 0,
        name: '商品管理',
        children: [
          {
            index: '/biz/create',
            icon: 'user-add',
            isIframe: 0,
            name: '新增用户',
            children: [],
          },
          {
            index: '/biz/list',
            icon: 'table',
            isIframe: 0,
            name: '商品列表',
            children: [],
          },
          {
            index: '/biz/detail',
            icon: 'audit',
            isIframe: 0,
            name: '商品详情',
            children: [],
          },
        ],
      },
      {
        index: '/iframe/test',
        icon: 'global',
        isIframe: 1,
        url: 'http://www.baidu.com',
        name: '外部页面',
        children: [],
      },
    ],
  },
  'POST /api/user-info': {
    code: 200,
    message: 'success',
    data: {
      userName: '禧云用户',
    },
  },
  'POST /api/list': {
    code: 200,
    message: 'success',
    data: [
      {
        id: '1',
        code: '98273492341',
        date: '2000-01-01',
        status: '有效',
      },
      {
        id: '2',
        code: '98273492342',
        date: '2000-01-01',
        status: '有效',
      },
      {
        id: '3',
        code: '98273492343',
        date: '2000-01-01',
        status: '有效',
      },
    ],
  },
};
