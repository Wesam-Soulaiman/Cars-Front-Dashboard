import { create } from "zustand";

let defaultMode = localStorage.getItem("car_mode");
defaultMode = defaultMode || "dark";

export const useTheme = create((set, get) => ({
  mode: defaultMode,
  changeMode: () => {
    set((state) => ({
      mode: state.mode === "dark" ? "light" : "dark",
    }));
  },
}));
