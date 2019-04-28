import axios from 'axios'
import { Message ,MessageBox} from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'


//全局发送post请求的默认头部content-type类型,定义类型为JSON格式，并且字符编码为utf-8
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// create an axios instance
const service = axios.create({
  baseURL:'http://127.0.0.1:7001',
  timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
    response => {
      //这里面设置自定义的错误
      const res = response.data;
      //40002 token为空 40001 token过期 40003重复登录 50000没有权限
      if (res.code === 40002 || res.code === 40001 || res.code === 40003 || res.code === 50000) {
        return Promise.reject(res.message);
      } else {
        return response.data
      }
    },
    error => {
      //这里面是http的错误,给前端显示，方便处理
      console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
      //请求如果发生了错误,这里会率先拦截并打印错误
      //打印完毕后,进入到用户的catch中继续处理
      //这里其实可以考虑，将所有用户在请求中的错误在这里集中进行处理，并不在用户中再处理catch了...
      //除非是你有更进一步的关于catch的处理任务，否则，不需要重复的在业务逻辑中添加catch
    }
)

export default service
