//登录/获取用户信息/登出的请求
import {login,logout,getInfo} from '@/api/login'
//设置/获取/删除token的方法
import {getToken,setToken,removeToken} from "@/utils/auth"
const user = {
  state:{
    token:getToken(),
    name:'',
    avatar:'',
    roles:[]
  },
  mutations:{
    SET_TOKEN:(state,token)=>{
      state.token = token
    },
    SET_NAME:(state,name)=>{
      state.name = name
    },
    SET_AVATAR:(state,avatar)=>{
      state.avatar = avatar
    },
    SET_ROLES:(state,roles)=>{
      state.roles = roles
    }
  },
  actions:{
    //登录
    Login({commit},userInfo){
      const username = userInfo.username.trim()
      return new Promise((resolve,reject)=>{
        //对于系统的错误和用户的错误，统一的reject处理比较合理
        login(username,userInfo.password).then(response=>{
          const data = response
          if(data.success == true){
            setToken(data.token)
            commit('SET_TOKEN',data.token);
            resolve(data.success) //用户登录成功
          }else{
            reject(data.message); //用户登录失败
          }
        })
      })
    },// 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(err=>{
          reject(err)
        })
      })
    },// 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(err=>{
          reject(err)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}
export default user
