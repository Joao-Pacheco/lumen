import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  setTheme: (Theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "light",
  setTheme: (theme) => {
    set({ theme }),
      localStorage.setItem("theme", theme),
      document.documentElement.classList.toggle("dark", theme === "dark");
  },
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.theme),
        document.documentElement.classList.toggle(
          "dark",
          state.theme === "dark"
        );
      return { theme: newTheme };
    });
  },
}));
