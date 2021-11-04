import request from '@/utils/request'

export function getinpatientMedicineMaterialProp(data) {
  return request({
    url: '/report/inpatient/getinpatientMedicineMaterialProp',
    method: 'post',
    data: data
  })
}
