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
  isUserLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ProfileResponse | null>(null);

  const [isUserLoading, setIsUserLoading] = useState(true);

  const logout = () => {
    Cookies.remove("auth_token");
    setUser(null);
  };

  const refreshUser = async () => {
    setIsUserLoading(true);

    const token = Cookies.get("auth_token");
    if (!token) {
      setUser(null);
      setIsUserLoading(false);
      return;
    }

    try {
      const profile = await getProfile();
      setUser(profile);
    } catch (err) {
      console.error("Ошибка при загрузке профиля", err);
      logout();
    } finally {
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, logout, refreshUser, isUserLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
