"use client";

import { useThemeStore } from "@/stores/useThemeStore";
import { useEffect } from "react";

export default function useTheme() {
  const setTheme = useThemeStore((state) => state.setTheme);
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = saved ?? (prefersDark ? "dark" : "light");
    setTheme(theme);
  }, [setTheme]);
}
