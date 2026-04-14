"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase";
import { RecordModel } from "pocketbase";

type AuthContextType = {
  user: RecordModel | null;
  isLoggedIn: boolean;
  logout: () => void;
  refreshUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  logout: () => {},
  refreshUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<RecordModel | null>(
    pb.authStore.record ?? null,
  );

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((_token, record) => {
      setUser(record ?? null);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    pb.authStore.clear();
  };

  const refreshUser = () => {
    setUser(pb.authStore.record ?? null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
