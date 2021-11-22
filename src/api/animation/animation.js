import request from '@/utils/request'

export function getMusic() {
  return request({
    url: '/animation/getBackgroundMusic',
    method: 'get'
  })
}