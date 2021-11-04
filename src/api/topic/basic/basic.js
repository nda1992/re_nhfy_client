import request from '@/utils/request'

export function getBasicData() {
  return request({
    url: '/visualize/basic/getDailyData',
    method: 'get'
  })
}
