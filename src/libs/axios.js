import Axios from 'axios'
import baseURL from '_conf/url'
import { Message } from 'iview'
import Cookies from 'js-cookie'
import { TOKEN_ID } from '@/libs/util'
Axios.defaults.withCredentials = true;

class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {};
  }
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      if (!config.url.includes('/users')) {
        config.headers['x-access-token'] = Cookies.get(TOKEN_ID)
      }
      // Spin.show()
      // 在发送请求之前做些什么
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      let data = res.data;
      const is = this.destroy(url)
      if (!is) {
        setTimeout(() => {
          // Spin.hide()
        }, 500)
      }

      if (data.errno !== 10000) {
        // 后端服务在个别情况下回报201，待确认
        if (data.errno === 401) {
          Cookies.remove(TOKEN_ID)
          window.location.href = '/login'
          Message.error('未登录，或登录失效，请登录')
        } else {
          if (data.errmsg) Message.error(data.errmsg)
        }
        return false
      }
      return data
    }, (error) => {
      Message.error('服务内部错误');
      console.log(error.response)
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 清除本地token，并跳转到登陆页
            window.location.href = '/login';
        }
      }
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }
  // 创建实例
  create () {
    let conf = {
      baseURL: baseURL,
      // timeout: 2000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-URL-PATH': location.pathname
      }
    }
    return Axios.create(conf)
  }
  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }
  // 请求实例
  request (options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}
export default httpRequest
