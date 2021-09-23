import request from '@/utils/request'

// 获取系统所有的用户列表
export function getUserlist(role) {
  return request({
    url: '/users/userList',
    method: 'get',
    params: { role }
  })
}
