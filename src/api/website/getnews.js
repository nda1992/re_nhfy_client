import request from '@/utils/request'
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