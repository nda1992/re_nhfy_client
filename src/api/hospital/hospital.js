import request from '@/utils/request'
// 获取部门列表
export function getdeptList(listQuery) {
  return request({
    url: '/hospital/getdeptList',
    method: 'get',
    params: listQuery
  })
}

// 新增部门
export function createDept(data) {
  return request({
    url: '/hospital/addDept',
    method: 'post',
    data
  })
}

// 更新部门
export function updateDept(data) {
  return request({
    url: '/hospital/updateDept',
    method: 'post',
    data
  })
}

// 删除部门
export function deleteDept(id) {
  return request({
    url: '/hospital/deleteDept',
    method: 'delete',
    params: { id }
  })
}
