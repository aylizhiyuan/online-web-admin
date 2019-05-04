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

### 8.









