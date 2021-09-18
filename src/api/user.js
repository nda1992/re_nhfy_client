import request from '@/utils/request'

// 用户注册
export function userRegister(data) {
  return request({
    url: '/users/register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}

export function getInfo(token, userCode) {
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

// 搜索科室
export function searchDepts(data) {
  return request({
    url: '/users/searchDept',
    method: 'post',
    data
  })
}

// 用户密码更新
export function updatePassword(data) {
  return request({
    url: '/users/updatePassword',
    method: 'post',
    data
  })
}
