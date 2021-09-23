import request from '@/utils/request'

// 获取系统所有用户信息
export function getAllEmployees(listQuery) {
  return request({
    url: '/employee/getAllEmployees',
    method: 'get',
    params: listQuery
  })
}

// 更新用户状态
export function updateUserStatus(listQuery) {
  return request({
    url: '/employee/updateUserStatus',
    method: 'get',
    params: listQuery
  })
}

// 删除用户
export function deleteUser(listQuery) {
  return request({
    url: '/employee/deleteUser',
    method: 'get',
    params: listQuery
  })
}
