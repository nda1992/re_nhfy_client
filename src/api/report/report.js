import request from '@/utils/request'

// 月度医疗收入情况表
export function medicalRevenue(obj) {
  return request({
    url: '/report/medicalRevenue',
    method: 'get',
    params: obj
  })
}
