import { create } from "zustand";

export const useSidebar = create((set) => ({
  open: false,
  selectedId: undefined,

  handleClose: () => {
    set({ open: false });
  },

  handleOpen: () => {
    set({ open: true });
  },

  handleSwitch: () => {
    set((state) => ({ open: !state.open }));
  },

  setSelected: (id) => {
    set({ selectedId: id });
  },
}));
