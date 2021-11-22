import request from '@/utils/request'

export function getoutpatientMedicineMaterialProp(data) {
  return request({
    url: '/report/outpatient/getoutpatientMedicineMaterialProp',
    method: 'post',
    data: data
  })
}

export function getAvgRevenueByDept(data) {
  return request({
    url: '/report/outpatient/getAvgRevenueByDept',
    method: 'post',
    data: data
  })
}

export function getAvgRevenueByDoctor(data) {
  return request({
    url: '/report/outpatient/getAvgRevenueByDoctor',
    method: 'post',
    data: data
  })
}
