import { create } from "zustand";

type ChatStoreType = {
  activeUsername: string | undefined;
  setActiveUsername: (username: string) => void;
};

export const useChatStore = create<ChatStoreType>((set) => ({
  activeUsername: undefined,
  setActiveUsername: (username: string) => {
    set({ activeUsername: username });
  },
}));
