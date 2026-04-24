import http from '@/utils/http';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    username: string;
    token: string;
    expire_at: Date;
    last_login_at: Date;
}

export const adminLogin = (data: LoginRequest): Promise<LoginResponse> => {
    return http.post<LoginResponse, LoginRequest>('/admin/login', data, { requireToken: false });
};