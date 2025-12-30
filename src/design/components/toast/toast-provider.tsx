import { styled } from "@linaria/react";
import * as Toast from "@radix-ui/react-toast";
import { useState, useRef, type ReactNode } from "react";
import { themeToken } from "../../styling/theme/theme";
import { ToastContext, type ToastContextType } from "./useToast";

export const ToastViewport = styled(Toast.Viewport)`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: ${themeToken("spacing-m")};
  gap: ${themeToken("spacing-s")};
  width: 100%;
  max-width: 420px;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
`;

const ToastRoot = styled(Toast.Root)`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${themeToken("spacing-s")};
  align-items: center;
  padding: ${themeToken("spacing-s")};
  border-radius: 8px;
  border: 1px solid #31684d;
  background: #183426;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: slideIn 200ms ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &[data-state="closed"] {
    animation: slideOut 200ms ease-out;
  }

  @keyframes slideOut {
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`;

const ToastTitle = styled(Toast.Title)`
  font-size: 14px;
  font-weight: 700;
  color: #ff6b6b;
`;

const ToastDescription = styled(Toast.Description)`
  font-size: 13px;
  color: #90cbad;
  grid-column: 1;
`;

const ToastAction = styled(Toast.Action)`
  padding: 6px 12px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid #90cbad;
  color: #90cbad;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms;

  &:hover {
    background: #90cbad;
    color: #102219;
  }
`;


type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("Error");
  const toastTimerRef = useRef(0);

  const show = (toastTitle: string, toastMessage: string) => {
    setTitle(toastTitle);
    setMessage(toastMessage);
    setOpen(false);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, 100);
  };

  const hide = ()=>{
    setOpen(false)
    setMessage('')
    setTitle('')
  }

  const value: ToastContextType = {
    show,
    hide
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast.Provider swipeDirection="right">
        <ToastRoot open={open} onOpenChange={setOpen} duration={5000}>
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{message}</ToastDescription>
          <ToastAction asChild altText="Close">
            <button onClick={() => setOpen(false)}>Dismiss</button>
          </ToastAction>
        </ToastRoot>
        <ToastViewport />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};
