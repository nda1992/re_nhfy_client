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
    url: '/recruit/getPositionList',
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
