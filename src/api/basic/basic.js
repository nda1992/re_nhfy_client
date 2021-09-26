import request from '@/utils/request'

export function basicMedicineAndMaterial(data) {
  return request({
    url: '/QueryTheam/basic/getOutpatientRevenue',
    method: 'post',
    data
  })
}
