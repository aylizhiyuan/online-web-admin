import store from '@/store'
const {body} = document
const WIDTH = 1024
const RATIO = 3
export default {
  watch:{
    $route(route){
      //监听当前的路由变化，如果设备为手机并且侧边栏打开则关闭侧边栏
      if(this.device === 'mobile' && this.sidebar.opened){
        store.dispatch('CloseSideBar',{withoutAnimation:false})
      }
    }
  },
  beforeMount(){
    window.addEventListener('resize',this.resizeHandler)
  },
  mounted(){
    //如果当前是手机的话，则关闭侧边栏
    const isMobile = this.isMobile()
    if(isMobile){
      store.dispatch('ToggleDevice','mobile')
      store.dispatch('CloseSideBar',{withoutAnimation: false})
    }
  },
  methods:{
    isMobile(){
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler(){
      if(!document.hidden){
        const isMobile = this.isMobile()
        store.dispatch('ToggleDevice',isMobile ? 'mobile':'desktop')
        if(isMobile){
          store.dispatch('CloseSideBar',{withoutAnimation:true})
        }
      }
    }
  }

}
