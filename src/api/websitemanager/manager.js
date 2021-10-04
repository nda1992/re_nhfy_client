import request from '@/utils/request'

export function getAllDoctorInfo(data) {
    return request({
        url: '/websitemanager/getAllDoctorInfo',
        method: 'get',
        params: data
    })
}
export function addDoctorInfo(data) {
    return request({
        url: '/websitemanager/addDoctorInfo',
        method: 'post',
        data
    })
}

export function updateDoctorInfo(data) {
    return request({
        url: '/websitemanager/updateDoctorInfo',
        method: 'put',
        data
    })
}

export function deleteDoctorInfo(data) {
    return request({
        url: '/websitemanager/deleteDoctorInfo',
        method: 'get',
        params: data
    })
}

// 恢复医生信息
export function recoverDoctorInfo(data) {
    return request({
        url: '/websitemanager/recoverDoctorInfo',
        method: 'get',
        params: data
    })
}

// 添加常用网站
export function addUsuallyWebsite(data) {
    return request({
        url: '/websitemanager/addUsuallyWebsite',
        method: 'post',
        data
    })
}

// 查询所有常用网站
export function getAllUsuallyWebsite(data) {
    return request({
        url: '/websitemanager/getAllUsuallyWebsite',
        method: 'get',
        params: data
    })
}

export function updateUsuallyWebsite(data) {
    return request({
        url: '/websitemanager/updateUsuallyWebsite',
        method: 'put',
        data
    })
}

export function deleteUsualleWebsiteById(data) {
    return request({
        url: '/websitemanager/deleteUsualleWebsiteById',
        method: 'get',
        params: data
    })
}

export function recoverUsualleWebsiteById(data) {
    return request({
        url: '/websitemanager/recoverUsualleWebsiteById',
        method: 'get',
        params: data
    })
}