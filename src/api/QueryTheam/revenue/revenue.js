import request from '@/utils/request'

// 科室收入分类查询
export function deptRevenueClassification(data) {
  return request({
    url: '/QueryTheam/revenue/kssrfl',
    method: 'post',
    data
  })
}

// 门诊住院药品和耗材明细
export function deptMaterialMedicineDetail(data) {
  return request({
    url: '/QueryTheam/revenue/deptMaterialMedicineDetail',
    method: 'post',
    data
  })
}

// 住院科室耗占比
export function deptMaterialProportion(data) {
  return request({
    url: '/QueryTheam/revenue/deptMaterialProportion',
    method: 'post',
    data
  })
}

export function deptMedicientProportion(data) {
  return request({
    url: '/QueryTheam/revenue/deptMedicientProportion',
    method: 'post',
    data
  })
}
