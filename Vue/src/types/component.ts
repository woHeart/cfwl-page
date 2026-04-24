// 登录和注册表单
export interface EnrollFormData {
  account: string
  password: string
  confirmPassword: string
}
export interface LoginFormData {
  account: string
  password: string
}

export interface ImgMap {
  [key: string]: string
}

// export interface StoryList extends Array<[string, string, string]>{
//   0: [string, string, string]
//   1: [string, string, string]
//   2: [string, string, string]
//   3: [string, string, string]
//   4: [string, string, string]
// }

export type StoryList = [string, string, string][]

export interface ThrottleOptions {
  leading?: boolean
  trailing?: boolean
}
