const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  // 动态路由
  addRouters: state => state.permission.addRouters,
  // 所有的路由
  permission_routers: state => state.permission.routers,
}
export default getters
