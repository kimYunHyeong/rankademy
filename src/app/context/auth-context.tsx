"use client";

import { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (t: string | null) => void;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setAccessToken(token);
  }, []);

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const headers = {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    return fetch(url, { ...options, headers, cache: "no-store" });
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, fetchWithAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
