import request from '@/utils/request'
// 定制表格标题
export function createTableTitle(obj) {
  return request({
    url: '/reportmake/createTableTitle',
    method: 'post',
    params: obj
  })
}
// 获取标题列表
export function getTableTitleList(role) {
  return request({
    url: '/reportmake/getTableTitleList',
    method: 'get',
    params: { role }
  })
}
// 根据id删除表格标题
export function deleteTableTitle(data) {
  return request({
    url: '/reportmake/deleteTableTitle',
    method: 'delete',
    data
  })
}
// 更新表格标题
export function updateTableTitle(data) {
  return request({
    url: '/reportmake/updateTableTitle',
    method: 'post',
    data
  })
}

// 查询科室分类收入
export function searchDeptOperate(data) {
  return request({
    url: '/reportmake/specialQuery/searchDeptOperate/ksflsr',
    method: 'post',
    data
  })
}

// 门诊和住院的药品和耗材明细
export function deptMaterialMedicineDetail(data) {
  return request({
    url: '/reportmake/specialQuery/searchDeptOperate/deptMaterialMedicineDetail',
    method: 'post',
    data
  })
}

// 住院耗占比
export function getdeptMaterialProportion(data) {
  return request({
    url: '/reportmake/specialQuery/searchDeptOperate/getdeptMaterialProportion',
    method: 'post',
    data
  })
}

// 全院药占比
export function getdeptMedicientProportion(data) {
  return request({
    url: '/reportmake/specialQuery/searchDeptOperate/getdeptMedicientProportion',
    method: 'post',
    data
  })
}

// 科室使用金额排名前20的耗材
export function getdeptMaterialAmountTop20(data) {
  return request({
    url: '/reportmake/specialQuery/searchDeptOperate/deptMaterialAmountTop20',
    method: 'post',
    data
  })
}
