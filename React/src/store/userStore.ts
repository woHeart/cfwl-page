import { create } from 'zustand';
import { type LoginResponse } from '@/api/user';

interface UserState {
  username: string | undefined;
  token: string | undefined;
  isLogin: boolean;
  login: (userInfo: LoginResponse) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  username: undefined,
  token: undefined,
  isLogin: false,

  login: (userInfo) => set({
    username: userInfo.username,
    token: userInfo.token,
    isLogin: true
  }),

  logout: () => set({
    username: undefined,
    token: undefined,
    isLogin: false
  }),
}));
