## 在线教育平台的后台管理页面

### 1. 项目结构分析

    ------ src
                ------ api 发送请求的方法都在这里，要求每一个页面的请求都写在一个文件下
                        ------login.js 登录页面请求的方法
    ------ assets 里面放我们需要打包的静态资源，项目中用到的
    ------ components 我们的小组件,非页面级别的组件
                ------ Breadcrumb 面包屑导航
                ------ Hamburger  切换侧边导航的组件
                ------ SvgIcon 加载svg图片的地方
    ------  icons 放svg图片的地方
    ------  router 路由文件
    ------  store 状态管理
                ------ modules 每一个模块的状态管理
                ------ getters.js 状态中的计算属性
                ------ index.js 入口文件
    ------  style 我们的样式文件
    ------  utils 通用的方法
                ------ auth 权限的一些方法
                ------ index 格式化日期时间的方法
                ------ request 对于axios的封装
                ------ validate 验证方法
    ------  views 我们的页面级别的组件
                ------ class 课程设置
                ------ courses 学科设置
                ------ dashboard 首页
                ------ errorPage 错误页面
                ------ layout 默认的首页模板
                ------ lives 直播
                ------ login 登录页面
                ------ news 新闻和运营
                ------ pays 财务和支付
                ------ resources 资源上传
                ------ students 注册用户管理
                ------ system 系统设置
    ------  App.vue 我们的根组件
    ------  main.js 入口文件
    ------  permission.js 权限判断

### 2. 权限设置

内置了三种权限:admin(系统管理员,最高权限),编辑者(editor,修改权限),游客(gust,参观数据)

### 3. 路由

这里的路由分为两种，constantRouterMap 和 asyncRouterMap。

constantRouterMap： 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。

asyncRouterMap： 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面。


### 4. 路由配置项

    //当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
    hidden: true // (默认 false)

    //当设置 noredirect 的时候该路由在面包屑导航中不可被点击
    redirect: 'noredirect'

    //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
    //只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
    //若你想不管路由下面的 children 声明的个数都显示你的根路由
    //你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
    alwaysShow: true

    name: 'router-name' //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    meta: {
      roles: ['admin', 'editor'] //设置该路由进入的权限，支持多个权限叠加
      title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
      icon: 'svg-name' //设置该路由的图标
      noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
      breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
    }

### 5.侧边栏:嵌套子菜单和直接连接

    // No submenu, because children.length===1
    {
      path: '/icon',
      component: Layout,
      children: [{
        path: 'index',
        component: ()=>import('svg-icons/index'),
        name: 'icons',
        meta: { title: 'icons', icon: 'icon' }
      }]
    },

    // Has submenu, because children.length>=1
    {
      path: '/components',
      component: Layout,
      name: 'component-demo',
      meta: {
        title: 'components',
        icon: 'component'
      },
      children: [
        { path: 'tinymce', component: ()=>import('components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
        { path: 'markdown', component: ()=>import('components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
      ]
    }

### 6. 新增页面的逻辑和顺序

- 首先在@/router/index.js中添加你需要添加的路由

      {
        path: '/excel',
        component: Layout,
        redirect: '/excel/export-excel',
        name: 'excel',
        meta: {
          title: 'excel',
          icon: 'excel'
        },
        children: [
          {
            path: 'export-excel',
            component: ()=>import('excel/exportExcel'),
            name: 'exportExcel',
            meta: { title: 'exportExcel' }
          }
        ]
      }

- 多级菜单的写法

      {
        path: '/excel',
        component: Layout,
        redirect: '/excel/export-excel',
        name: 'excel',
        meta: {
          title: 'excel',
          icon: 'excel'
        },
        children: [
          { path: 'export-excel', component: ()=>import('excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
          { path: 'export-selected-excel', component: ()=>import('excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
          { path: 'upload-excel', component: ()=>import('excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
        ]
      }

- 接下来新增view文件

新增完路由之后不要忘记在 @/views 文件下 创建对应的文件夹，一般性一个路由对应一个文件，该模块下的功能组件或者方法就建议在本文件夹下创建一个utils或components文件夹，各个功能模块维护自己的utils或components组件


- 接下来新增API

在@/api文件夹下创建本模块对应的api服务


### 7. 与服务器交互的写法

- UI组件交互操作
- 调用同一管理的api service请求函数(@/api里面的服务)
- 使用封装的request.js发送请求
- 获取服务端返回
- 更新data

看一个简单的例子:

      // api/article.js
      import request from '../utils/request';
      export function fetchList(query) {
        return request({
          url: '/article/list',
          method: 'get',
          params: query
        })
      }


      // views/example/list
      import { fetchList } from '@/api/article'
      export default {
        data() {
          list: null,
          listLoading: true
        },
        methods: {
          fetchData() {
            this.listLoading = true
            fetchList().then(response => {
              this.list = response.data.items
              this.listLoading = false
            })
          }
        }
      }

### 8. 学科模块

学科其实就是我们所说的课程的方向

1. 前端开发
2. 后端开发
3. 数据库
4. 计算机专业课

每个学科下面应该还有一个具体的二级分类

***前端开发***  

1. html5
2. css3
3. javascript
4. jquery
5. bootstrap
6. vue
7. elementUI
8. iview
9. nuxt
10. webpack
11. react
12. antd
13. 微信小程序
14. 前端工具
15. flutter
16. ionic
17. angularJS
18. canvas&svg&webGL
19. websocket

***后端开发***
1. nodejs
2. express
3. koa
4. egg
5. nginx
6. electron
7. docker
8. c&c++

***数据库***
1. mongodb
2. redis
3. mysql

***计算机专业课***
1. 计算机网络
2. 操作系统
3. 数据结构与算法
4. 数学基础
5. 汇编
6. 设计模式
7. 编译原理
8. 计算机组成原理

创建学科的时候，需要填写学科的名称，学科的对应描述以及学科的展示图

创建学科成功后，便可以对某个学科内的分类进行创建和修改了，我们所有的视频对应的都是某个学科下面的具体的学科分类，学科可以停用和启用，启用学科后，学科内的所有视频会展示出来，停用某个学科后，学科下面的视频是无法观看的，学科也可以直接选择删除，删除学科后，该学科下的所有视频将无法观看。上面的逻辑同样适用于学科内的分类

### 9.资源模块

所有的视频都必须先提前上传到云服务器上，方可跟具体的课程搭配(新建课程的时候视频必须从内部的库中选取)，资源模块的主要作用就是显示所有的视频信息和进行视频的上传.

1. 上传视频:上传视频的时候，需要设置上传视频的学科、学科分类、上传的资源目前只支持视频格式的资源。上传的时候支持重传、暂停、继续、并显示当前的上传进度，支持多个视频文件的上传，并可以进行删除
2. 视频列表: 视频列表中显示视频的名称、类型(视频、图片)、格式、分类、状态、来源、创建时间、操作，操作里面包括编辑(修改视频的名称、学科、学科分类)、禁用、删除

### 10.课程模块

该模块用来发布课程,目前课程的发布主要以免费为主，后期考虑付费的课程，观看的人必须下单支付后才可以在线观看。

课程的显示跟前台一样，有一个具体的过滤条件(根据学科、学科分类、类型、状态)，显示所有的课程列表

目前，新增课程只有一种视频的类型，其余的类型后期再考虑加入

新增课程的步骤：第一步，填写基本信息-----> 第二步,设置课程的详情 ---> 第三步，安排视频

基本信息：学科、学科分类、课程名称、定价、优惠价、购买基数、总课时、是否为推荐课程

课程详情：课程的封面、描述、课程详情

安排视频：安排视频的时候步骤如下:
1. 新增章节：点击新增章节添加章节，填写章节名称和章节描述，每次新增的时候自动添加对应数字的章节
2. 新增章节下面的小结：每次点击新增按钮自动添加对应数字的小结，每个小结对应着小结的名称、视频的名称，视频是从资源模块中选择对应的视频
3. 点击保存，完成整个课程的设置

### 另外在课程列表中，用户可以对课程进行管理、删除和下架操作


### 11. 运营模块

运营模块主要是发布关于学科的新闻和技术类文章，主要分为设置新闻类型和添加新闻两个主要功能
1. 新闻类型列表：新闻的类型、状态、创建时间、操作(禁用、修改)
2. 添加新闻类型：新闻的类型名称
3. 添加新闻：新闻的标题、分类、是否推荐、封面图片、概述、内容

可支持预览，点击发布发布新闻，新闻列表中显示新闻的标题、类型、状态、创建时间、创建人、操作(删除、修改、下线)


### 12. 学员模块

学员模块主要是对注册的学员进行管理和对学员进行通知
1. 学员列表：前台会有注册用户的接口，用户通过注册可以观看网站的视频。那么这里，会显示所有已注册用户的信息，最关键的信息是手机号码，后期可根据微信、支付宝、QQ登录，在这里，我们可以看到所有学员的相关信息。在操作一栏中，可以对学员的信息进行查看，他当前的学习的记录和消费的记录
2. 学员通知：管理员你可以以三种形式发布信息，一种是短信方式、另外一种是站内信的方式发布通知，通知需要填写通知的标题、通知的方式、通知的类型、发送内容、验证码来发布信息

### 13. 财务模块

用户的点击付费观看视频是网站的主要收入来源，用户通过加入购物车、支付、下单生成订单，订单信息会显示在这里。

具体显示的内容有购买的用户姓名、账号、下单时间、商品的类型、商品的名称、商品价、实付价格、订单状态、支付方式、查看订单详情






 









