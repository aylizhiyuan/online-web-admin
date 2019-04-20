import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getToken } from "@/utils/auth"

NProgress.configure({ showSpinner: false })// NProgress Configuration

//判断是否有权限
function hasPermission(roles,permissionRoles){
  if(roles.indexOf('admin') >= 0){
    return true
  }
  if(!permissionRoles) return true
  return roles.some(role=>permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login'] //不重定向白名单
router.beforeEach((to,from,next)=>{
  NProgress.start()
  if(getToken()){
    if(to.path === '/login'){
      next({path:'/'}) //如果在已经登录的情况下访问登录页面，直接重定向首页
      NProgress.done();
    }else{
      //在有权限的情况下，访问正常的页面
      if(store.getters.roles.length === 0){
        store.dispatch('GetInfo').then(res=>{
          //这里拉一下用户的信息就是为了动态生成路由
          const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            console.log(store.getters.addRouters)
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err=>{
          store.dispatch('FedLogOut').then(()=>{
            Message.error(err || 'Verification failed,please login again')
            next({path:'/'})
          })
        })
      }else{
        //已经拉过权限表了
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        //每次跳转页面的时候，都会判断下当前这个用户是否有这个权限进入这个页面.
        //因为有动态改变权限的需求，如果没有的话，可以直接next
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  }else{
    //如果没有拿到token
    if(whiteList.indexOf(to.path) !== -1){
      //白名单里面的直接next
      next()
    }else{
      //不在白名单里面的直接定向到登录页面，并记录自己要跳转的地址
      next(`/login?redirect=${to.path}`) //否则全部重定向到登录页
      NProgress.done()
    }
  }
})
router.afterEach(()=>{
  NProgress.done() //结束progress
})
