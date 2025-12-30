import React, { useEffect } from "react";
import { themeVariants, type ThemeVariants } from "./theme";

const STORAGE_KEY = "theme-preference";

const applyTheme = (theme: ThemeVariants) => {
  document.documentElement.classList.remove(
    themeVariants.light,
    themeVariants.dark
  );
  document.documentElement.classList.add(theme);

  localStorage.setItem(STORAGE_KEY, theme);
};

const getInitialTheme = (): ThemeVariants => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme: ThemeVariants = e.matches ? "dark" : "light";
      
      //   if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(newTheme);
      //   }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return <>{children}</>;
};

export default ThemeProvider;
