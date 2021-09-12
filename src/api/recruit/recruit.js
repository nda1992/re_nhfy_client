import request from '@/utils/request'

// 添加岗位
export function createPosition(data) {
  return request({
    url: '/recruit/addPosition',
    method: 'post',
    data
  })
}

export function getPositionList(query) {
  return request({
    url: '/position/getPositionList',
    method: 'get',
    params: query
  })
}

// 更新岗位信息
export function updatePosition(data) {
  return request({
    url: '/recruit/updatePosition',
    method: 'post',
    data
  })
}

// switch更新状态
export function updatepositionStatus(data) {
  return request({
    url: '/recruit/updatepositionStatus',
    method: 'post',
    data
  })
}

// 删除岗位
export function deletePosition(id) {
  return request({
    url: '/recruit/deletePosition',
    method: 'delete',
    params: { id }
  })
}

// 恢复status
export function recoverpositionStatus(data) {
  return request({
    url: '/recruit/recoverpositionStatus',
    method: 'post',
    data
  })
}

// 管理员获取所有已经接收到的消息
export function getReceiveMsg2Admin(data) {
  return request({
    url: '/recruit/getReceiveMsg2Admin',
    method: 'post',
    data
  })
}
// 管理员获取所有已经发送的消息
export function getSendMsg2Admin(data) {
  return request({
    url: '/recruit/getSendMsg2Admin',
    method: 'post',
    data
  })
}

// 管理员上传轮播图
export function uploadSwiper(data) {
  return request({
    url: '/recruit/uploadSwiper',
    method: 'post',
    data
  })
}

// 查询所有已经上传的轮播图
export function getAllSwiperImgs(query) {
  return request({
    url: '/recruit/getAllSwiperImgs',
    method: 'get',
    params: query
  })
}

// 根据id删除轮播图片
export function deleteImgById(data) {
  return request({
    url: '/recruit/deleteImgById',
    method: 'post',
    data
  })
}

// 提交要展示的轮播图
export function SetSwiperStatus(query) {
  return request({
    url: '/recruit/SetSwiperStatus',
    method: 'get',
    params: query
  })
}

// 获取轮播图并播放
export function getSwiperImgs2Run(query) {
  return request({
    url: '/recruit/getSwiperImgs2Run',
    method: 'get',
    params: query
  })
}
