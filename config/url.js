import env from './env'
import buildType from './build_type'

const DEV_URL = 'http://admin-platform-jixiang.icloud.xstvos.cn' // 'http://admin-platform-jixiang.icloud.xstvos.cn'
const PRO_URL = 'https://omp.xstvos.com'
const BETA_URL = 'https://omp-beta.xstvos.com'

//正式
// const DEV_URL = 'https://omp.xstvos.com'
// const PRO_URL = 'https://omp.xstvos.com'

var BASE_URL = DEV_URL;

// console.log(buildType)

if (buildType == 'beta'){
    BASE_URL = BETA_URL;
}else{
    BASE_URL = env === 'development' ? DEV_URL : PRO_URL
}

export default BASE_URL //env === 'development' ? DEV_URL : PRO_URL
