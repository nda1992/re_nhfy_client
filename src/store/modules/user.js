import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '', // 用户名
    avatar: '', // 用户头像
    userCode: '', // 用户职工号
    deptName: '', // 所属部门
    role:''       //用户角色
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = localStorage.setItem('token', token)
  },
  SET_NAME: (state, name) => {
    state.name = localStorage.setItem('name', name)
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = localStorage.setItem('avatar', avatar)
  },
  SET_USERCODE: (state, userCode) => {
    state.userCode = localStorage.setItem('userCode', userCode)
  },
  SET_DEPTNAME: (state, deptName) => {
    state.deptName = localStorage.setItem('deptName', deptName)
  },
  SET_ROLE: (state,role) => {
    state.role = localStorage.setItem('role',role)
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_USERCODE', data.userCode)
        commit('SET_ROLE',data.role)
        // setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    const userCode = localStorage.getItem('userCode')
    const token = localStorage.getItem('token')
    return new Promise((resolve, reject) => {
      getInfo(token, userCode).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        // console.log(data)
        const { avatar, usercode, deptname, name } = data
        // commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_DEPTNAME', deptname)
        commit('SET_USERCODE', usercode)
        commit('SET_NAME',name)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  //upload avatar
  uploadavatar({ commit, state }) {
    return new Promise((resolve,reject)=>{
      commit('SET_AVATAR',state.avatar)
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

