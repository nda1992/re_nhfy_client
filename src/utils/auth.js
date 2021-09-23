import Cookies from 'js-cookie'
const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

// token值7天有效
export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 7 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
