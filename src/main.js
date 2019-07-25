// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VCharts from 'v-charts'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import { Message } from 'iview'
import i18n from '@/locale'
import config from '@/config'
import axios from 'axios'
import importDirective from '@/directive'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'

import VueCropper from 'vue-cropper'

axios.defaults.withCredentials = true;
// import '@/mock'
// 实际打包时应该不引入mock
// import env from '../config/env'
/* eslint-disable */
//env === 'development' ? require('@/mock') : ''

Vue.use(iView,{
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false
Vue.use(VueCropper)
Vue.use(VCharts)

// 请求对象拦截器
// 请求之前拦截
axios.interceptors.request.use(
  config => {
    // 判断本地token是否存在，
    // 如果不存在则跳转到登陆页，
    // 如果存在则加到头信息里
    // if (token) {
    //     config.headers.Authorization = token;
    // }
    // router.replace({
    //   path: '/login'
    // })
    return config
  },
  err => {
    return Promise.reject(err)
  })

// 请求相应拦截器
axios.interceptors.response.use(
  response => {
    console.log(response)
    let data = response.data;
    if (response.status == 401 || data.errno == 401){
      Cookies.remove(TOKEN_ID)
      window.location.href = '/login'
      Message.error('未登录，或登录失效，请登录')
    }else if (data.errno != 10000) {
      if (data.errmsg != '' && typeof data.errmsg != 'undefined') {
        // console.log(`hehe`)
        Message.error(data.errmsg);
      }
    }
    // if (data.errno !== 10000) {
    //   // 后端服务在个别情况下回报201，待确认
    //   if (data.errno === 401) {
    //     Cookies.remove(TOKEN_ID)
    //     window.location.href = window.location.pathname + '#/login'
    //     Message.error('未登录，或登录失效，请登录')
    //   } else {
    //     if (data.errmsg != '' && typeof data.errmsg != 'undefined') Message.error(data.msg)
    //   }
    //   return response
    // }

    return response
  },
  error => {
    console.log(error.response);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 清除本地token，并跳转到登陆页
          window.location.href = '/login';
      }
    }
    return Promise.reject(error.response.data)
  });


/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

Vue.prototype.$http = axios

/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
