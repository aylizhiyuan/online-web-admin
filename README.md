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
    ------  App.vue 我们的根组件
    ------  main.js 入口文件
    ------  permission.js 权限判断          

2. 
