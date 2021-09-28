import request from '@/utils/request'

export function getMenusList() {
  return request({
    url: '/website/getMenusList',
    method: 'get'
  })
}
// 根据parent查询指定的menus
export function getMenusByParent(data) {
  return request({
    url: '/website/getMenusByParent',
    method: 'get',
    params: data
  })
}
