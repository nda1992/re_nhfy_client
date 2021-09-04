import request from '@/utils/request'

// 获取所有岗位列表
export function getPositionList(query) {
  return request({
    url: '/position/getPositionList',
    method: 'get',
    params: query
  })
}

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

// 求职者投递简历
export function postPosition(data) {
  return request({
    url: '/position/postPosition',
    method: 'post',
    data
  })
}

// 获取某个用户已经投递的岗位列表
export function getPost2PositionListByUid(id) {
  return request({
    url: '/position/getPost2PositionListByUid',
    method: 'get',
    params: { jobseekerId: id }
  })
}

// 用户取消投递的某个岗位
export function cancelPostedByPid(data) {
  return request({
    url: '/position/cancelPostedByPid',
    method: 'get',
    params: data
  })
}

// 用户确认参加考试
export function confirmStauts(data) {
  return request({
    url: '/position/confirmStauts',
    method: 'get',
    params: data
  })
}
