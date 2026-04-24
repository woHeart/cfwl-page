import http from '@/utils/http'
import { LoginFormData, EnrollFormData, LoginResponse, EnrollResponse } from '@/types'

export const accountLogin = (data: LoginFormData) => {
  return http.post<LoginResponse, typeof data>('/user/login', data)
}

export const accountEnroll = (data: EnrollFormData) => {
  return http.post<EnrollResponse, typeof data>('/user/enroll', data)
}
