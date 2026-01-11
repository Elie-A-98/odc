import { QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "../design/styling/theme/ThemeProvider";
import { ToastProvider } from "../design/components/toast/toast-provider";
import { queryClient } from "../lib/tq/tq";
import { AppRoutes } from "./routes";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../design/components/error-fallback";
import { FetchProvider } from "../lib/fetch/fetch-provider";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ToastProvider>
        <FetchProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <AppRoutes />
            </ThemeProvider>
          </QueryClientProvider>
        </FetchProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
