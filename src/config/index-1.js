import env from '_conf/env'

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

  //根地址
  //jx
  BaseURL: 'http://promotion-admin.jixiang.com',
  //xmd  zj
  BaseURL1: 'http://media.icloud.xstvos.cn',
  //lyh
  BaseURL2: 'http://manager-admin-lyh.icloud.xstvos.cn',
  //屏保
  BaseURL3: 'http://omp.icloud.xstvos.cn',
  //zyj
  BaseURL4: 'http://program-admin.icloud.xstvos.cn',
  //zyj
  BaseURL7: 'http://media.icloud.xstvos.cn:8002',
  //上传根地址
  BaseURLfile: 'http://omp.icloud.xstvos.cn',
  // xx.ptxstv.gitv.tv
  //修改密码
  BaseURL5: 'http://admin-platform.jixiang.com',
  // jx
  BaseURL6: 'http://common-admin.jx.icloud.xstvos.cn'
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

  //根地址
  //jx
  BaseURL: 'https://promotion-admin.xstvos.com',
  //xmd zj
  BaseURL1: 'https://media.xstvos.com',
  //lyh
  BaseURL2: 'https://device-admin.xstvos.com',
  //屏保
  BaseURL3: 'https://omp.xstvos.com',
  //zyj
  BaseURL4: 'https://mam-admin.xstvos.com',
  //上传根地址
  BaseURLfile: 'https://omp.xstvos.com',
  //修改密码
  BaseURL5: 'https://omp.xstvos.com',
  // common-admin.xstvos.com
  BaseURL6: 'https://common-admin.xstvos.com'

}

export default env === 'development' ? DEV : PRO
