// lib/store/authStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  
  login: (user: User) => void;
  logout: () => void;
  updateUser: (newUser: Partial<User>) => void; 
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user) => 
        set({
          user,
          isAuthenticated: true,
        }),

      logout: () => 
        set({
          user: null,
          isAuthenticated: false,
        }),

      updateUser: (newUserPartial) => 
        set((state) => ({
          user: state.user 
            ? { ...state.user, ...newUserPartial } 
            : null,
        })),
    }),
    {
      name: 'auth-storage', 
    }
  )
);