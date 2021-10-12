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

// 求职者收藏岗位
export function handleCollect(data) {
  return request({
    url: '/position/handleCollect',
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

// 根据文件的url查看简历
export function getResumeFile(data) {
  return request({
    url: '/position/getResumeFile',
    method: 'post',
    data
  })
}

// 给求职者发送消息
export function sendMessage(data) {
  return request({
    url: '/position/sendMessage',
    method: 'post',
    data
  })
}

// 求职者接收到的消息列表
export function getReceiveMsg(data) {
  return request({
    url: '/position/getReceiveMsg',
    method: 'post',
    data
  })
}

// 求职者发送的消息列表
export function getSendMsg(data) {
  return request({
    url: '/position/getSendMsg',
    method: 'post',
    data
  })
}

// 根据jobseekerid更新消息为已读
export function updateIsread(data) {
  return request({
    url: '/position/updateIsread',
    method: 'post',
    data
  })
}

// 接收者删除收到的某条消息
export function receiveRemoveMsg(data) {
  return request({
    url: '/position/receiveRemoveMsg',
    method: 'post',
    data
  })
}

// 求职者删除收到的所有消息
export function removeAllReceiveMsg(data) {
  return request({
    url: '/position/removeAllReceiveMsg',
    method: 'post',
    data
  })
}

// 求职者回复消息
export function replyMessage(data) {
  return request({
    url: '/position/replyMessage',
    method: 'post',
    data
  })
}

// 求职者删除已发送的某条消息
export function removeSendMsg(data) {
  return request({
    url: '/position/removeSendMsg',
    method: 'post',
    data
  })
}

// 求职者删除所有已发送的消息
export function removeAllSendMsg(data) {
  return request({
    url: '/position/removeAllSendMsg',
    method: 'post',
    data
  })
}

// 求职者、官网（不用token认证）获取轮播图并播放
export function getSwiperImgs2Run(query) {
  return request({
    url: '/position/getSwiperImgs2Run',
    method: 'get',
    params: query
  })
}

// 多条件过滤岗位
export function filterPositions(data) {
  return request({
    url: '/position/filterPositions',
    method: 'post',
    data
  })
}
