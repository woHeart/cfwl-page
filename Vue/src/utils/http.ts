import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from '@/types'
import { isTokenValid, removeToken } from '@/utils/auth'
import { BusinessError, RequestTokenError } from './error'

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
          const error = new RequestTokenError('token无效或已过期')
          ElMessage.error(error.message)
          return Promise.reject(error)
        }

        headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`
        return config
      },
      (error: AxiosError) => {
        ElMessage.error("请求异常，请稍后再试")
        return Promise.reject(error)
      },
    )

    this.instance.interceptors.response.use(
      <T>(response: AxiosResponse<ApiResponse<T>>) => {
        const { data } = response
        if (data.code === '200') {
          return data.data
        } else {
          const error = new BusinessError(data.msg || '请求失败', data.code);
          ElMessage.error(error.message)
          return Promise.reject(error);
        }
      },
      (error: AxiosError) => {
        ElMessage.error("响应异常，请稍后再试")
        return Promise.reject(error)
      },
    )
  }

  // 请求方法
  public get<T, P = undefined>(url: string, params?: P): Promise<T> {
    return this.instance.get(url, { params })
  }

  public post<T, D>(url: string, data: D): Promise<T> {
    return this.instance.post(url, data)
  }
}

const http = new HttpClient()

export default http
