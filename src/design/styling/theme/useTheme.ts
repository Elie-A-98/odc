import { createContext, useContext } from "react";
import type { ThemeVariants } from "./theme";

type ThemeContextType = {
  currentTheme: ThemeVariants;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};