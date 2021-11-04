import request from '@/utils/request'

export function getOutpatientSumm() {
  return request({
    url: '/visualize/summary/getOutpatientSumm',
    method: 'get'
  })
}
