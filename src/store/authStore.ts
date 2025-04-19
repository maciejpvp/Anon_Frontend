import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

type User = {
  userId: string;
  username: string;
};

type AuthStoreType = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthStoreType>((set) => ({
  user: null,

  setUser: (user: User) => {
    set({ user });
  },
  clearUser: async () => {
    await axiosInstance.get("/auth/logout");
    set({ user: null });
  },
}));
