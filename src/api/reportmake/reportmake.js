import request from '@/utils/request'
// 定制表格标题
export function createTableTitle(obj) {
  return request({
    url: '/reportmake/createTableTitle',
    method: 'post',
    params: { obj }
  })
}
// 获取标题列表
export function getTableTitleList(role) {
  return request({
    url: '/reportmake/getTableTitleList',
    method: 'get',
    params: { role }
  })
}
// 根据id删除表格标题
export function deleteTableTitle(id) {
  return request({
    url: '/reportmake/deleteTableTitle',
    post: 'delete',
    params: { id }
  })
}
// 更新表格标题
export function updateTableTitle(data) {
  return request({
    url: '/reportmake/updateTableTitle',
    method: 'post',
    data
  })
}
