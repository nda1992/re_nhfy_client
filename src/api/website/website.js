import request from '@/utils/request'

export function getMenusList() {
  return request({
    url: '/website/getMenusList',
    method: 'get'
  })
}
// 根据parent查询指定的menus
export function getMenusByParent(data) {
  return request({
    url: '/website/getMenusByParent',
    method: 'get',
    params: data
  })
}

// 获取所有的视频列表
export function getAllVideos(data) {
  return request({
    url: '/website/getAllVideos',
    method: 'get',
    params: data
  })
}

// 根据id删除视频
export function deleteVideoById(data) {
  return request({
    url: '/website/deleteVideoById',
    method: 'post',
    data
  })
}

// 更新视频是否进行展示
export function SetVideoStatus(data) {
  return request({
    url: '/website/SetVideoStatus',
    method: 'get',
    params: data
  })
}

// 获取status=1的视频
export function getVideoListByStatus(data) {
  return request({
    url: '/website/getVideoListByStatus',
    method: 'get',
    params: data
  })
}

// 获取学科荟萃信息
export function getSubjectAssembleList(data) {
  return request({
    url: '/website/getSubjectAssembleList',
    method: 'get',
    params: data
  })
}

// 获取所有的医生（grade=专家）的列表
export function getAllExpertList(data) {
  return request({
    url: '/website/getAllExpertList',
    method: 'get',
    params: data
  })
}

// 根据id获取医生详细信息
export function getDoctorDetailById(data) {
  return request({
    url: '/website/getDoctorDetailById',
    method: 'get',
    params: data
  })
}
