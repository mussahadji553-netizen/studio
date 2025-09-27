'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';

type UserStatus = 'guest' | 'pending' | 'approved';

interface AuthUser {
  name: string;
  email: string;
  status: UserStatus;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, name: string, status: UserStatus) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      const item = window.localStorage.getItem('betpro-user');
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('betpro-user', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('betpro-user');
    }
  }, [user]);

  const login = (email: string, name: string, status: UserStatus) => {
    setUser({ email, name, status });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
