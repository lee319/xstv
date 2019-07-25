
import env from '_conf/env'
import buildType from '_conf/build_type'

// 测试环境
const DEV = {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,

  // 根地址
  // jx
  BaseURL: 'http://promotion-admin.jixiang.com',
  // xmd  zj
  BaseURL1: 'http://media.icloud.xstvos.cn',
  // lyh
  BaseURL2: 'http://manager-admin-lyh.icloud.xstvos.cn',
  // 屏保
  BaseURL3: 'http://omp.icloud.xstvos.cn',
  // zyj
  BaseURL4: 'http://program-admin.icloud.xstvos.cn',
  // zyj
  BaseURL7: 'http://media.icloud.xstvos.cn:8005',
  // zyj
  BaseURL8: 'http://cms.icloud.xstvos.cn:8004',
  // 上传根地址
  BaseURLfile: 'http://omp.icloud.xstvos.cn',
  // 修改密码
  BaseURL5: 'http://admin-platform-jixiang.icloud.xstvos.cn',
  // jx
  BaseURL6: 'http://common-admin.jx.icloud.xstvos.cn',
  // jx
  BaseURL9: 'http://common-admin.jx.icloud.xstvos.cn',
  // 订单
  BaseURL10: 'http://usercenter-admin-lyh.icloud.xstvos.cn',
  // 应用商店
  BaseURL11: 'http://appstore-lyh.icloud.xstvos.cn',
  // 上传oss
  BaseURL12: 'http://common-admin.jx.icloud.xstvos.cn',
  // 学习机
  BaseURL13: 'http://study-admin-lyh.icloud.xstvos.cn',
  // cms2.0开机
  BaseURL15: 'http://common-admin-lyh.icloud.xstvos.cn',
  // 轮播台，节目信息管理
  BaseURL16: 'http://wheelstation-admin-lyh.icloud.xstvos.cn',
  //手工推荐列表
  BaseURL18: 'http://media.icloud.xstvos.cn:8004'
}

// 正式环境
const PRO = {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,

  // 根地址
  // jx
  BaseURL: 'https://promotion-admin.xstvos.com',
  // xmd zj
  BaseURL1: 'https://media.xstvos.com',
  // lyh
  BaseURL2: 'https://device-admin.xstvos.com',
  // 屏保
  BaseURL3: 'https://omp.xstvos.com',
  // zyj
  BaseURL4: 'https://mam-admin.xstvos.com',
  // 上传根地址
  BaseURLfile: 'https://omp.xstvos.com',
  // 修改密码
  BaseURL5: 'https://omp.xstvos.com',

  BaseURL6: 'https://common-admin.xstvos.com',
  // jx
  BaseURL9: 'https://common-admin.xstvos.com',

  BaseURL7: 'https://media.xstvos.com',
  // 订单
  BaseURL10: 'https://usercenter-admin.xstvos.com',
  // 应用商店
  BaseURL11: 'https://appstore-admin.xstvos.com',
  // 上传oss
  BaseURL12: 'https://common-admin.xstvos.com',
  // 学习机
  BaseURL13: 'https://study-admin.xstvos.com'
}

// 正式环境 - beta 环境
const PRO_BETA = {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,

  // 根地址
  // jx   
  BaseURL: 'https://promotion-admin-beta.xstvos.com',
  // xmd zj
  BaseURL1: 'https://media-beta.xstvos.com',
  // lyh
  BaseURL2: 'https://device-admin-beta.xstvos.com',
  // 屏保
  BaseURL3: 'https://omp-beta.xstvos.com',
  // zyj
  BaseURL4: 'https://mam-admin-beta.xstvos.com',
  // 上传根地址
  BaseURLfile: 'https://omp-beta.xstvos.com',
  // 修改密码
  BaseURL5: 'https://omp-beta.xstvos.com',
  // common-admin.xstvos.com
  BaseURL6: 'https://common-admin-beta.xstvos.com',

  BaseURL9: 'https://common-admin-beta.xstvos.com',

  BaseURL7: 'https://media-beta.xstvos.com',
  // 会员中心
  BaseURL10: 'https://usercenter-admin-beta.xstvos.com',
  // 应用商店
  BaseURL11: 'https://appstore-admin-beta.xstvos.com',
  // 上传oss
  BaseURL12: 'https://common-admin-beta.xstvos.com',
  // 学习机
  BaseURL13: 'https://study-admin-beta.xstvos.com',

  BaseURL15: 'https://common-admin-beta.xstvos.com',
  //手工推荐列表
  BaseURL18: 'https://cms-beta.xstvos.com'
}

var URL_CONFIG = DEV

if (buildType === 'beta') {
  URL_CONFIG = PRO_BETA
} else if (env === 'production') {
  URL_CONFIG = PRO
} else {
  URL_CONFIG = DEV
}

export default URL_CONFIG
