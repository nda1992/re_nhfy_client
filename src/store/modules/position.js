import { positionLogin } from '@/api/recruit/position'

// 求职者的状态管理
const state = {
  username: '',
  phone: '',
  email: '',
  avatar: '',
  role: '',
  isLogin: false
}


const mutations = {
  SET_AVATAR: (state, avatar) => {
    sessionStorage.setItem('avatar', avatar)
    state.avatar = avatar
  },
  CLEAR_AVATAR: (state) => {
    state.avatar = ''
    sessionStorage.removeItem('avatar')
  },
  SET_USERNAME: (state, username) => {
    sessionStorage.setItem('jobseekerUsername', username)
    state.username = username
  },
  CLEAR_USERNAME: (state) => {
    state.username = ''
    sessionStorage.removeItem('jobseekerUsername')
  },
  SET_PHONE: (state, phone) => {
    sessionStorage.setItem('phone', phone)
    state.phone = phone
  },
  CLEAR_PHONE: (state) => {
    state.phone = ''
    sessionStorage.removeItem('phone')
  },
  SET_EMAIL: (state, email) => {
    sessionStorage.setItem('email', email)
    state.email = email
  },
  CLEAR_EMAIL: (state) => {
    state.email = ''
    sessionStorage.removeItem('email')
  },
  SET_ROLE: (state, role) => {
    sessionStorage.setItem('jobseekerRole', role)
    state.role = role
  },
  CLEAR_ROLE: (state) => {
    state.role = ''
    sessionStorage.removeItem('jobseekerRole')
  },
  SET_ISLOGIN: (state) => {
    sessionStorage.setItem('isLogin', true)
    state.isLogin = true
  },
  CLEAR_ISLOGIN: () => {
    state.isLogin = false
    sessionStorage.removeItem('isLogin')
  }
}

const actions = {
  positionLogin({ commit }, userinfo) {
    const { account, password } = userinfo
    return new Promise((resolve, reject) => {
      positionLogin({ account: account, password: password }).then(res => {
        const { username, avatar, role, phone, email } = res.data
        commit('SET_AVATAR',avatar)
        commit('SET_USERNAME', username)
        commit('SET_PHONE', phone)
        commit('SET_EMAIL', email)
        commit('SET_ROLE', role)
        commit('SET_ISLOGIN')
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户退出，清除所有的用户信息
  logout({ commit }) {
    commit('CLEAR_AVATAR')
    commit('CLEAR_USERNAME')
    commit('CLEAR_PHONE')
    commit('CLEAR_EMAIL')
    commit('CLEAR_ROLE')
    commit('CLEAR_ISLOGIN')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
