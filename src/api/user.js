import axios from '@/libs/api.request'
import Qs from 'qs'


export const login = ({ userName, password }) => {
  const data = {
    email: userName,
    passwd: password
  }

  return axios.request({
    url: 'login/login',
    data: Qs.stringify(data),
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
  })
}


export const getUserInfo = (token) => {
  if (token == false || typeof token == 'undefined') {
    return
  }
  return axios.request({
    url: 'login/getuserinfo',
    params: {
      token
    },
    method: 'get'
  })
}
