"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "admin" | "editor" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  location: string;
  currentPlaylist: string;
  status: "online" | "offline";
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  signup: (name: string, email: string, location: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_USER: User = {
  id: "admin-001",
  name: "DJ Octo",
  email: "admin@lyra.com",
  avatar: "/avatars/dj_octopus.png",
  role: "admin",
  location: "Kampala, Uganda",
  currentPlaylist: "Abyssal Grooves",
  status: "online",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage or just default to admin for this demo
    // For now, we'll start with the admin logged in to show the feature
    setUser(ADMIN_USER);
  }, []);

  const login = (email: string) => {
    // Mock login
    if (email === ADMIN_USER.email) {
      setUser(ADMIN_USER);
    } else {
        // Mock user login
        setUser({
            id: "user-" + Math.random().toString(36).substr(2, 9),
            name: "New User",
            email,
            avatar: "/hero/webmodel2.png", // Default
            role: "editor",
            location: "Unknown",
            currentPlaylist: "My Mix",
            status: "online"
        })
    }
  };

  const signup = (name: string, email: string, location: string) => {
    const newUser: User = {
      id: "user-" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      avatar: "/hero/webmodel2.png", // In a real app, they'd upload one
      role: "editor",
      location,
      currentPlaylist: "Fresh Finds",
      status: "online",
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
