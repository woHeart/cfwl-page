import http from '@/utils/http';

export interface MenuItem {
    key: string;
    label: string;
    path: string;
    children?: MenuItem[];
}

export const getMenu = (): Promise<MenuItem[]> => {
    return http.get<MenuItem[]>('/menu', undefined, { requireToken: false });
};