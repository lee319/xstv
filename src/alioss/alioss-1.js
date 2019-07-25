import Config from '@/config'
const OSS = require('ali-oss')

// oss 上传对象
class AliOSS {
  constructor (axios) {
    this.axios = axios
  }

  // 获取上传所需信息
  applyTokenDo (f) {
    if (this.axios == null) {
      console.log('axios请求对象为null')
      return
    }
    this.axios.get(`${Config.BaseURL12}/common/aliyunoss/token`).then(response => {
      if (response.data.errno === 10000) {
        this.token = response.data.data.token
        this.path = response.data.data.path
        let ossCfg = {
          region: 'oss-cn-beijing',
          accessKeyId: this.token.AccessKeyId,
          accessKeySecret: this.token.AccessKeySecret,
          stsToken: this.token.SecurityToken,
          bucket: this.path.bucketName
        }
        let client = new OSS(ossCfg);
        f(client);
      } else {
        console.log('请求sts信息错误:' + response.data.errmsg);
      }
    })
  }

  /**
     * 上传文件
     * @param {*} file file文件对象
     */
  OssUpload (file) {
    console.log(file)
    if (!this.axios) {
      console.log('请通过new AliOSS(this.$http)方式创建 AliOSS 对象');
      return
    }
    // 上传的文件路径
    return this.applyTokenDo((client) => {
      let pathname = this.path.path + getDeviceTag() + '/' + (new Date()).getTime() + getFileExt(file.name);
      return client.put(pathname, file);
    });
  }

  /**
     * 删除文件
     * @param {string} filepath 要删除的完整路径
     */
  OssDelete (filepath) {
    console.log(filepath)
    if (!filepath) {
      console.log('请输入要删除的对象路径')
      return
    }
    return this.applyTokenDo((client) => {
      return client.delete(filepath)
    })
  }
}

/**
 * 获取文件格式
 * @param {String} name 文件名，包含后缀的文件名
 */
const getFileExt = name => {
  let index1 = name.lastIndexOf('.')
  let index2 = name.length
  let suffix = name.substring(index1 + 1, index2) // 后缀名
  return suffix
}

// 获取设备标识，随机生成的，防止oss文件名重复
const getDeviceTag = () => {
  let key = 'xstv-device-tag'
  let tag = localStorage.getItem(key)
  if (!tag) {
    tag = randomWord(false, 6, 9)
    localStorage.setItem(key, tag)
  }
  return tag
}

/**
 * 生成随机字符串
 * @param {boolean} randomFlag 是否生成随机长度
 * @param {Number} min 最小长度，不随机长度时的固定长度
 * @param {Number} max 随机长度时最大长度
 */
const randomWord = (randomFlag, min, max) => {
  let str = ''
  let range = min
  let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  // 随机产生
  if (randomFlag) {
    // eslint-disable-next-line no-unused-vars
    let range = Math.round(Math.random() * (max - min)) + min
  }
  for (var i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

export default AliOSS

/**
 * 使用方法
 */

//  安装alioss
//  cnpm install ali-oss --save
//  引入此js到对应vue
//  import AliOSS from '@/alioss/alioss'
//  上传 file 为文件对象
//  AliOSS.New(this.$http).OssUpload(file);
