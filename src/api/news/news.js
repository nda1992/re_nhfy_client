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

// 根据文章id浏览
export function ScanById(data) {
  return request({
    url: '/news/ScanById',
    method: 'get',
    params: data
  })
}

// 根据switch的值改变文章的发表状态
export function updateNewsStatus(data) {
  return request({
    url: '/news/updateNewsStatus',
    method: 'post',
    data
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

// 获取草稿内容
export function getDraftList(data) {
  return request({
    url: '/news/getDraftList',
    method: 'get',
    params: data
  })
}

// 根据新闻id获取草稿内容
export function getDraftById(data) {
  return request({
    url: '/news/getDraftById',
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

// 上传官网菜单
export function submitMenu(data) {
  return request({
    url: '/news/submitMenu',
    method: 'post',
    data
  })
}
