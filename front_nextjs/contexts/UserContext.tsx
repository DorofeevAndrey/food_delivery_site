"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { getProfile, ProfileResponse } from "@/libs/api/profile";

type UserContextType = {
  user: ProfileResponse | null;
  setUser: (user: ProfileResponse | null) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ProfileResponse | null>(null);

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  const refreshUser = async () => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const profile = await getProfile(token);
      setUser(profile);
    } catch (err) {
      console.error("Ошибка при загрузке профиля", err);
      logout();
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser должен использоваться внутри UserProvider");
  return context;
};
