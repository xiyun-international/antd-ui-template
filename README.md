
# 禧云 antd-ui-template

### 简介

antd-ui-template 是一个基于 vue-cli3 和 ant-design-vue 组件库搭建的一套适用于中后台项目的框架模板。

### 特点
* 无需再做额外的底层配置，开箱即用
* 已内置基于 axios 封装好的 http 请求方法，禧云业务级 UI 组件
* 节省从零搭建一个项目框架的时间成本

### 使用

```shell
启动项目
$ yarn start

打包项目
$ yarn build
```

### 项目目录结构

```
├── dists             # 打包文件目录
├── node_modules      # 第三方依赖包
├── public            # 公共文件，主要存储样式，字体，图片等
├── src               # 项目源码
│   ├── assets        # 公用样式
│   ├── components    # 公用组件目录
│   ├── plugins       # 按需引入组件配置目录
│   ├── router        # 路由配置目录
│   ├── store         # vuex 的 store 目录
│   │   └── modules   # store 的 modules 目录
│   ├── utils         # 工具函数目录
│   └── views         # 项目页面目录
```

### 菜单结构
菜单推荐通过接口获取，目前我们使用了 mock 数据来模拟，菜单结构示例如下：
```js
[
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
]
```

### 路由配置

框架集成了[`@xiyun/vue-route-webpack-plugin`][1]（路由扫描 webpack 插件），只要在页面级文件中写了路由配置，插件就会扫描到并生成路由文件：
```js
/**
 * 商品列表页路由
 * @route('biz/list')
 */
```
框架示例页面中已配置好路由，请参看各页面

### 外部 iframe 
我们为外部 iframe 提供了一个 demo 页面，如果你需要此类业务，你可以在
`views/iframe`下查看。

### 本地 mock 接口
mock 接口文件存放在 `__mock__` 目录下，使用禧云 mock 工具可以启动 mock 服务：
```
// 如果没有安装过 mock 插件，需要安装一下
$ xy add @xiyun/xy-plugin-mock
// 启动 mock 服务
$ xy mock
```


### git commit message 规范

本项目框架默认在执行 git commit 的时候调用了 hook 来检查提交消息的规范，
意味着你在执行`git commit -am'feat: 增加新功能'`时，消息必须要写相应的前缀来标明这次提交的类型。

类型可选项有：
- feat：新增 feature
- fix: 修复 bug
- docs: 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE等等
- style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
- refactor: 代码重构，没有加新功能或者修复 bug
- perf: 优化相关，比如提升性能、体验
- test: 测试用例，包括单元测试、集成测试等
- chore: 改变构建流程、或者增加依赖库、工具等
- revert: 回滚到上一个版本

如果你不需要这个规范，可以在 `package.json` 中删除掉 commit-msg 的配置：
```json
{
  "gitHooks": {
    "commit-msg": "commitlint -E GIT_PARAMS"
  },
}
```

[1]: https://github.com/xiyun-international/vue-route-webpack-plugin
