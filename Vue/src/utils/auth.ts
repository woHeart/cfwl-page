export const setToken = (token: string, expiresIn: number = 3600): void => {
  sessionStorage.setItem('token', token)
  const expireTime: number = new Date().getTime() + expiresIn * 1000
  sessionStorage.setItem('tokenExpireTime', expireTime.toString())
}

export const isTokenValid = (): boolean => {
  const token = sessionStorage.getItem('token')
  const expireTimeStr = sessionStorage.getItem('tokenExpireTime')
  if (!token || !expireTimeStr) {
    return false
  }
  return new Date().getTime() < Number(expireTimeStr)
}

export const removeToken = (): void => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('tokenExpireTime')
}
