// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getToken, clearToken } from "../services/Auth.services";
import { login as loginService, register as registerService } from "../services/Auth.services";

type User = {
  email: string;
  role: string;
  username: string;
  firstname: string;
  lastname: string;
  birthdate: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    username: string,
    firstname: string,
    lastname: string,
    birthdate: string,
    role: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Vérifie au démarrage si un token existe
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        if (token) {
          // Option 1: appeler /auth/me avec ton back
          const res = await fetch(`${process.env.API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          } else {
            await clearToken();
            setUser(null);
          }
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const u = await loginService(email, password);
    setUser(u);
  };

  const register = async (
    email: string,
    password: string,
    username: string,
    firstname: string,
    lastname: string,
    birthdate: string,
    role: string
  ) => {
    const u = await registerService(email, password, username, firstname, lastname, birthdate, role);
    setUser(u);
  };

  const logout = async () => {
    await clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
