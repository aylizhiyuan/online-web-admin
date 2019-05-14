import Vue from 'vue'
import Router from 'vue-router'


// 模版的默认样式
import Layout from '../views/layout/Layout'

Vue.use(Router)

// 静态路由的配置参数在这里面
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
    name: '首页',
    hidden: false,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  }
]

export default new Router({
  // mode:'history', //后端支持可以开启
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 动态的路由配置,下面的路由如果登录用户没有足够的权限是看不到的
export const asyncRouterMap = [
  {
    path: '/courses',
    component: Layout,
    redirect: '/courses/index',
    meta: { title: '学科', icon: 'coursera', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'index',
        name: '学科',
        component: () => import('@/views/courses/index'),
        meta: {
          title: '学科',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/resources',
    component: Layout,
    redirect: '/resources/index',
    meta: { title: '资源', icon: 'resource_icon', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'index',
        name: '资源',
        component: () => import('@/views/resources/index'),
        meta: {
          title: '资源',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/class',
    component: Layout,
    redirect: '/class/index',
    meta: { title: '课程', icon: 'class', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'index',
        name: '课程',
        component: () => import('@/views/class/index'),
        meta: {
          title: '课程',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/news/index',
    meta: { title: '运营', icon: 'news', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'index',
        name: '运营',
        component: () => import('@/views/news/index'),
        meta: {
          title: '运营',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/students',
    component: Layout,
    redirect: '/students/index',
    meta: { title: '学员', icon: 'student', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'index',
        name: '学员',
        component: () => import('@/views/students/index'),
        meta: {
          title: '学员',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/lives',
    component: Layout,
    redirect: '/lives/index',
    meta: { title: '直播', icon: 'live', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'index',
        name: '直播',
        component: () => import('@/views/lives/index'),
        meta: {
          title: '直播',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/pays',
    component: Layout,
    redirect: '/pays/index',
    meta: { title: '财务', icon: 'pay', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'index',
        name: '财务',
        component: () => import('@/views/pays/index'),
        meta: {
          title: '财务',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    meta: { title: '系统管理', icon: 'system', roles: ['admin'] },
    children: [
      {
        path: 'index',
        name: '系统管理',
        component: () => import('@/views/system/index'),
        meta: {
          title: '系统管理',
          roles: ['admin']
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];
