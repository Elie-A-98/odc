import React, { useEffect, useState } from "react";
import { themeVariants, type ThemeVariants } from "./theme";
import { ThemeContext } from "./useTheme";

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
  const [currentTheme, setCurrentTheme] = useState<ThemeVariants>(() =>
    getInitialTheme()
  );

  const toggleTheme = () => {
    const newTheme: ThemeVariants = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    applyTheme(currentTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme: ThemeVariants = e.matches ? "dark" : "light";
      setCurrentTheme(newTheme);
      applyTheme(newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
