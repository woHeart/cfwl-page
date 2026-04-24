import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from '@/types'
import { isTokenValid, removeToken } from '@/utils/auth'

class HttpClient {
  private instance: AxiosInstance
  private noTokenPatterns: string[]

  constructor() {
    this.instance = axios.create({
      baseURL: '/vue',
      timeout: 5000,
    })
    this.noTokenPatterns = ['/user/login', '/user/enroll', '/music', '/wordbanner']
    this.setupInterceptors()
  }

  // 拦截器
  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const { url, headers } = config
        const requiresToken: boolean = !this.noTokenPatterns.some(
          (noTokenUrl) => noTokenUrl === url,
        )

        if (!requiresToken) {
          return config
        }

        if (!isTokenValid()) {
          removeToken()
          router.push('/account')
          ElMessage.error('token无效或已过期')
          console.error('token无效或已过期',)
          return Promise.reject(new Error('token无效或已过期'))
        }

        headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`
        return config
      },
      (error: AxiosError) => {
        ElMessage.error(error.message)
        console.error('请求拦截器的失败回调捕获到了异常', error)
        return Promise.reject(error)
      },
    )

    this.instance.interceptors.response.use(
      <T>(response: AxiosResponse<ApiResponse<T>>) => {
        const { data } = response
        if (data.code === '200') {
          return data.data
        } else {
          ElMessage.error(data.msg)
          console.error(data.msg)
          return Promise.reject(new Error(data.msg))
        }
      },
      (error: AxiosError) => {
        ElMessage.error(error.message)
        console.error('响应拦截器的失败回调捕获到了异常', error)
        return Promise.reject(error)
      },
    )
  }

  // 请求方法
  public get<T, P>(url: string, params?: P): Promise<T> {
    return this.instance.get(url, { params })
  }

  public post<T, D>(url: string, data: D): Promise<T> {
    return this.instance.post(url, data)
  }
}

const http = new HttpClient()

export default http
