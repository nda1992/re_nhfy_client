import request from '@/utils/request'
export function deleteNewsById(id) {
  return request({
    url: '/news/deleteNewsById',
    method: 'delete',
    params: { id }
  })
}

export function getnewsList(data) {
  return request({
    url: '/news/getnewsList',
    method: 'get',
    params: data
  })
}

// 发布文章
export function releaseNews(data) {
  return request({
    url: '/news/releaseNews',
    method: 'post',
    data
  })
}

// 保存文章操作
export function saveDraft(data) {
  return request({
    url: '/news/releaseNews',
    method: 'post',
    data
  })
}

export function searchUser(data) {
  return request({
    url: '/news/searchUser',
    method: 'get',
    params: data
  })
}

export function createCategory(data) {
  return request({
    url: '/news/createCategory',
    method: 'post',
    data
  })
}
export function searchCategory(data) {
  return request({
    url: '/news/searchCategory',
    method: 'get',
    params: data
  })
}

export function searchDept(data) {
  return request({
    url: '/news/searchDept',
    method: 'get',
    params: data
  })
}
