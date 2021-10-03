import request from '@/utils/request'

export function submitAdvice(data) {
    return request({
        url: '/website/advice',
        method: 'post',
        data
    })
}