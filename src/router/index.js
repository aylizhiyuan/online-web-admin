import Vue from 'vue'
import Router from 'vue-router'


//模版的默认样式
import Layout from '../views/layout/Layout'

Vue.use(Router)

//静态路由的配置参数在这里面
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path:'/form',
    component:Layout,
    children:[
      {
        path:'index',
        name:'Form',
        component:()=>import('@/views/form/index'),
        meta:{title:'测试表单',icon:'form'}
      }
    ]
  }
]

export default new Router({
  //mode:'history', //后端支持可以开启
  scrollBehavior:()=>({y:0}),
  routes:constantRouterMap
})

//动态的路由配置,下面的路由如果登录用户没有足够的权限是看不到的
export const asyncRouterMap = [
  {
    path: '/permission',
    component:Layout,
    redirect:'/permission/index',
    meta:{title:'测试权限',icon:'lock',roles:['admin']},
    children:[
      {
        path:'index',
        name:'测试权限',
        component:()=>import('@/views/permission/index'),
        meta:{
          title:"测试权限",
          roles:['admin']
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];
