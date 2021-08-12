import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}

export function getInfo(token,userCode) {
  return request({
    url: '/users/info',
    method: 'get',
    params: { userCode }
  })
}

export function logout() {
  return request({
    // url: '/vue-admin-template/user/logout',
    url: '/users/logout',
    method: 'post'
  })
}


