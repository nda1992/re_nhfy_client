import { login, logout, getInfo } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// 对sessionStorage加密
import { StorageClass } from '@/utils/session'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '', // 用户名
    avatar: '', // 用户头像
    userCode: '', // 用户职工号
    deptName: '', // 所属部门
    role: '' // 用户角色
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    StorageClass.setSession('token', { token: token })
    setToken(token)
    state.token = token
  },
  SET_NAME: (state, name) => {
    StorageClass.setSession('name', { name: name })
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    StorageClass.setSession('avatar', { avatar: avatar })
    state.avatar = avatar
  },
  SET_USERCODE: (state, userCode) => {
    StorageClass.setSession('userCode', { userCode: userCode })
    state.userCode = userCode
  },
  SET_DEPTNAME: (state, deptName) => {
    StorageClass.setSession('deptName', { deptName: deptName })
    state.deptName = deptName
  },
  SET_ROLE: (state, role) => {
    StorageClass.setSession('role', { role: role })
    state.role = role
  },
  CLEAR_ALL: () => {
    getDefaultState().avatar = ''
    getDefaultState().token = ''
    getDefaultState().name = ''
    getDefaultState().userCode = ''
    getDefaultState().deptName = ''
    getDefaultState().role = ''
    StorageClass.sessionClearAll()
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password.trim() }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_USERCODE', data.userCode)
        commit('SET_ROLE', data.role)
        // setToken(data.token)
        resolve()
      }).catch(error => {
        console.log(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    const userCode = StorageClass.getSession('userCode').userCode
    const token = StorageClass.getSession('token').token
    return new Promise((resolve, reject) => {
      getInfo(token, userCode).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { avatar, usercode, deptname, name } = data
        commit('SET_AVATAR', avatar)
        commit('SET_DEPTNAME', deptname)
        commit('SET_USERCODE', usercode)
        commit('SET_NAME', name)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('CLEAR_ALL')
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // upload avatar
  uploadavatar({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_AVATAR', state.avatar)
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

