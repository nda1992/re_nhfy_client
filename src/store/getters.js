const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userCode: state => state.user.userCode,
  deptname: state => state.user.deptName,
  visitedViews: state => state.tagsView.visitedViews

}

export default getters
