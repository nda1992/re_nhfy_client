import { positionLogin, getPositionList } from '@/api/recruit/position'
// 对sessionStorage加密
import { StorageClass } from '@/utils/session'
// 求职者的状态管理
const state = {
  id: undefined,
  jobseekerUsername: '',
  phone: '',
  email: '',
  avatar: '',
  file: '',
  role: '',
  isLogin: false
}

const mutations = {
  SET_ID: (state, id) => {
    StorageClass.setSession('jobseekerId', { jobseekerId: id })
    state.id = id
  },
  SET_AVATAR: (state, avatar) => {
    StorageClass.setSession('avatar', { avatar: avatar })
    state.avatar = avatar
  },
  SET_FILE: (state, file) => {
    StorageClass.setSession('file', { file: file })
    state.file = file
  },
  SET_USERNAME: (state, username) => {
    StorageClass.setSession('jobseekerUsername', { jobseekerUsername: username })
    state.jobseekerUsername = username
  },
  SET_PHONE: (state, phone) => {
    StorageClass.setSession('phone', { phone: phone })
    state.phone = phone
  },
  SET_EMAIL: (state, email) => {
    StorageClass.setSession('email', { email: email })
    state.email = email
  },
  SET_ROLE: (state, role) => {
    StorageClass.setSession('jobseekerRole', { jobseekerRole: role })
    state.role = role
  },
  SET_ISLOGIN: (state, isLogin) => {
    sessionStorage.setItem('isLogin', isLogin)
    state.isLogin = isLogin
  },
  CLEAR_ISLOGIN: (state) => {
    state.isLogin = false
    sessionStorage.removeItem('isLogin')
  },
  CLEAR_ALL: (state) => {
    state.id = undefined
    state.jobseekerUsername = ''
    state.phone = ''
    state.email = ''
    state.avatar = ''
    state.file = ''
    state.role = ''
    state.isLogin = false
    StorageClass.sessionClearAll()
  }
}

const actions = {
  positionLogin({ commit }, userinfo) {
    const { account, password } = userinfo
    return new Promise((resolve, reject) => {
      positionLogin({ account: account, password: password }).then(res => {
        const { id, username, avatar, file, role, phone, email } = res.data
        commit('SET_ID', id)
        commit('SET_AVATAR', avatar)
        commit('SET_FILE', file)
        commit('SET_USERNAME', username)
        commit('SET_PHONE', phone)
        commit('SET_EMAIL', email)
        commit('SET_ROLE', role)
        commit('SET_ISLOGIN', true)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户退出，清除所有的用户信息
  logout({ commit }) {
    commit('CLEAR_ALL')
  },
  // 重置sessionStorage中的value
  resetSession({ commit }, data) {
    commit('SET_AVATAR', data.avatar)
    commit('SET_USERNAME', data.username)
    commit('SET_PHONE', data.phone)
    commit('SET_EMAIL', data.email)
  },
  // 头像上传成功重置avatar
  resetAvatar({ commit }, data) {
    commit('SET_AVATAR', data.avatar)
  },
  // 文件上传成功后，重置file的值
  resetFile({ commit }, data) {
    commit('SET_FILE', data.file)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
