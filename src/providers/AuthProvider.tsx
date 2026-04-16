"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { pb } from "@/lib/pb";
import { User } from "@/types";

type AuthContextType = {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (emailOrUsername: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState<User | null>(
    pb.authStore.isValid ? (pb.authStore.model as unknown as User) : null
  );

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((_token, model) => {
      setCurrentUser(model ? (model as unknown as User) : null);
      queryClient.invalidateQueries({ queryKey: ["serverGroupHistory"] });
    });
    return () => unsubscribe();
  }, [queryClient]);

  const login = async (emailOrUsername: string, password: string) => {
    await pb.collection("users").authWithPassword(emailOrUsername, password);
  };

  const register = async (email: string, username: string, password: string) => {
    await pb.collection("users").create({
      email,
      username,
      password,
      passwordConfirm: password,
    });
    await pb.collection("users").authWithPassword(email, password);
  };

  const logout = () => {
    pb.authStore.clear();
    queryClient.invalidateQueries({ queryKey: ["serverGroupHistory"] });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: pb.authStore.isValid,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
