import { create } from 'zustand';
}));
  },
    set({ user });
    localStorage.setItem('current_user', JSON.stringify(user));
  setUser: (user: User) => {

  },
    });
      isAuthenticated: false,
      token: null,
      user: null,
    set({
    localStorage.removeItem('current_user');
    localStorage.removeItem('auth_token');
  clearAuth: () => {

  },
    });
      isAuthenticated: true,
      token,
      user,
    set({
    localStorage.setItem('current_user', JSON.stringify(user));
    localStorage.setItem('auth_token', token);
  setAuth: (user: User, token: string) => {

  isAuthenticated: !!localStorage.getItem('auth_token'),
  token: localStorage.getItem('auth_token'),
  user: JSON.parse(localStorage.getItem('current_user') || 'null'),
export const useAuthStore = create<AuthState>((set) => ({

}
  setUser: (user: User) => void;
  clearAuth: () => void;
  setAuth: (user: User, token: string) => void;
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
interface AuthState {

import { User } from '../types';

