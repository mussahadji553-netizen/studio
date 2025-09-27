'use client';

import { createContext, useState, ReactNode } from 'react';

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
  const [user, setUser] = useState<AuthUser | null>(null);

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
