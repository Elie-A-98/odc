import React, {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ApiError, protectedFetch } from "./fetch-utils";
import { FetchContext } from "./useFetch";
import { styled } from "@linaria/react";
import { useNavigate } from "react-router";
import { navLinkFactory } from "../navigation/nav-links";

const LoadingIndicator = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  border: 3px solid transparent;
  background: linear-gradient(90deg, #0df280, #3b82f6, #0df280, #3b82f6)
    border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: gradientMove 2s linear infinite;
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.2s;

  &[data-loading="true"] {
    opacity: 1;
  }

  @keyframes gradientMove {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 200% 0%;
    }
  }
`;

export const FetchProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const inFlight = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      clearTimeout(hideTimer.current);
    };
  }, []);

  const wrappedProtectedFetch = useCallback<typeof protectedFetch>(
    async (...args) => {
      try {
        inFlight.current++;
        clearTimeout(hideTimer.current);
        setIsLoaderVisible(true);
        return await protectedFetch(...args);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          navigate(navLinkFactory.login);
        }
        throw err;
      } finally {
        inFlight.current--;
        if (inFlight.current === 0) {
          hideTimer.current = setTimeout(() => {
            setIsLoaderVisible(false);
          }, 100);
        }
      }
    },
    [navigate]
  );

  const contextVal = useMemo(
    () => ({
      protectedFetch: wrappedProtectedFetch,
    }),
    [wrappedProtectedFetch]
  );

  return (
    <FetchContext.Provider value={contextVal}>
      <LoadingIndicator data-loading={isLoaderVisible} aria-hidden="true" />
      {children}
    </FetchContext.Provider>
  );
};
