import { create } from "zustand";

type useDropdownStoreType = {
  activeDropdown: string | null;
  setActiveDropdown: (id: string) => void;
  closeDropdown: () => void;
};

export const useDropdownStore = create<useDropdownStoreType>((set) => ({
  activeDropdown: null,

  setActiveDropdown: (id: string) => {
    set({ activeDropdown: id });
  },

  closeDropdown: () => {
    set({ activeDropdown: null });
  },
}));
