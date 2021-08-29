import request from '@/utils/request'

// 求职者注册
export function positionRegister(data) {
  return request({
    url: '/position/positionRegister',
    method: 'post',
    data
  })
}

// 求职者登录
export function positionLogin(data) {
  return request({
    url: '/position/positionLogin',
    method: 'post',
    data
  })
}
