import React, { createContext, useContext, useState } from "react";
import { LoginRequest, UserResponse } from "../types/auth";
import { loginApi } from "../services/auth.service";

interface AuthContextType {
  user: UserResponse | null;
  token: string | null;
  // login: (data: LoginRequest) => Promise<void>;
  login: (data: LoginRequest) => Promise<UserResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserResponse | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const login = async (data: LoginRequest): Promise<UserResponse> => {
    const res = await loginApi(data);
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    return res.user; // ✅ Trả user ra để dùng tiếp
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
