// 保存新闻相关的全局变量
const state = {
  url: 'http://localhost:3000/images/news/default.png' // 默认的新闻封面URL
}
const mutations = {
  SET_URL: (state, url) => {
    sessionStorage.setItem('news_url', url)
    state.url = url
  }
}

const actions = {
  setNewsBackgroundUrl({ commit }, state) {
    commit('SET_URL', state.url)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}