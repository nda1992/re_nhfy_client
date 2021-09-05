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

// 根据jobseeker拉取用户的所有信息
export function UserinfoDetail(id) {
  return request({
    url: '/position/UserinfoDetail',
    method: 'get',
    params: { uid: id }
  })
}

// 更新个人信息
export function updateUserinfo(data) {
  return request({
    url: '/position/updateUserinfo',
    method: 'post',
    data
  })
}

// 用户密码找回
export function updatePasswd(data) {
  return request({
    url: '/position/updatePasswd',
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
export function getPost2PositionListByUid(data) {
  return request({
    url: '/position/getPost2PositionListByUid',
    method: 'get',
    params: data
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

// 管理员审核求职者的简历状态
export function setPositionStatus(data) {
  return request({
    url: '/position/setPositionStatus',
    method: 'post',
    data
  })
}

// 管理员删除jobseeker投递的简历
export function deletePost2Position(data) {
  return request({
    url: '/position/deletePost2Position',
    method: 'delete',
    params: data
  })
}

//根据文件的url查看简历
export function getResumeFile(data) {
  return request({
    url: '/position/getResumeFile',
    method: 'post',
    data
  })
}
