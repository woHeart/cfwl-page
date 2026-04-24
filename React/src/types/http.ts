import { type AxiosRequestConfig } from 'axios';

export interface ApiResponse<T> {
    code: number;
    msg: string;
    data: T;
}

// 扩展Axios请求配置，可选配置是否需要token（默认需要）
export interface RequestConfig extends AxiosRequestConfig {
    requireToken?: boolean; // 自定义字段：是否需要token验证
}