import axios, {
    type AxiosInstance,
    type AxiosResponse,
    type InternalAxiosRequestConfig
} from 'axios';
import { type ApiResponse, type RequestConfig } from '@/types/http';
import { message } from 'antd';

class Http {
    private instance: AxiosInstance;
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.instance = axios.create({
            baseURL: this.baseURL,
            timeout: 10000,
        });
        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const reqConfig = config as RequestConfig;
                if (reqConfig.requireToken !== false) {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        message.error('你谁?')
                        return Promise.reject(new Error('未检测到登录凭证，请先登录'));
                    }
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            <T>(response: AxiosResponse<ApiResponse<T>>) => {
                const { data } = response;
                if (data.code === 200) {
                    return data.data;
                }
                return Promise.reject(new Error(data.msg));
            },
            (error) => {
                const errorMsg = error.response?.data?.msg || error.message;
                const errorCode = error.response?.data?.code || error.code;
                const errorStatus = error.response?.status;
                console.error(errorCode, errorStatus);
                if (errorCode || errorStatus === 401) {
                    localStorage.removeItem('token');
                    message.error('你谁?')
                }

                return Promise.reject(new Error(errorMsg));
            }
        );
    }

    /**
     * @param url 请求地址（相对地址）
     * @param params URL参数
     * @param data 请求体数据
     * @param config 自定义请求配置
     */
    public get<T, D = never>(
        url: string,
        params?: D,
        config: RequestConfig = {}
    ): Promise<T> {
        return this.instance.get(url, { ...config, params });
    }

    public post<T, D = never>(
        url: string,
        data?: D,
        config: RequestConfig = {}
    ): Promise<T> {
        return this.instance.post(url, data, config);
    }

    public put<T, D = never>(
        url: string,
        data?: D,
        config: RequestConfig = {}
    ): Promise<T> {
        return this.instance.put(url, data, config);
    }

    public delete<T, D = never>(
        url: string,
        params?: D,
        config: RequestConfig = {}
    ): Promise<T> {
        return this.instance.delete(url, { ...config, params });
    }
}

const http = new Http('/react');

export default http;