import { createContext, useContext } from "react";

export type ToastContextType = {
  hide: () => void;
  show: (title: string, message: string) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
