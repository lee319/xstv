import axios from '@/libs/api.request'

export const getCategoryList = () => {
  console.log(this)
  return axios.request({
    url: 'http://media.xstvos.com/media/category/list',
    method: 'get'
  })
}

export const delCategory = () => {
  return axios.request({
    url: '/media/topic/delete'
  })
}
