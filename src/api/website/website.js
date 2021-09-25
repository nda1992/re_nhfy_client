import request from '@/utils/request'

export function getMenusList() {
  return request({
    url: '/website/getMenusList',
    method: 'get'
  })
}
