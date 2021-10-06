import request from '@/utils/request'
// 根据新闻类别查询新闻
export function getAllNewsByCategory(data) {
  return request({
    url: '/website/news/getAllNewsByCategory',
    method: 'get',
    params: data
  })
}

export function getNewsById(data) {
  return request({
    url: '/website/news/getNewsById',
    method: 'get',
    params: data
  })
}

// export function getNewsByCategory(data) {
//   return request({
//     url: '/website/news/getNewsByCategory',
//     method: 'get',
//     params: data
//   })
// }