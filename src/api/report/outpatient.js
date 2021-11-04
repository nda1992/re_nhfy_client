import request from '@/utils/request'

export function getoutpatientMedicineMaterialProp(data) {
  return request({
    url: '/report/outpatient/getoutpatientMedicineMaterialProp',
    method: 'post',
    data: data
  })
}
