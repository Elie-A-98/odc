import { QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "../design/styling/theme/ThemeProvider";
import { ToastProvider } from "../design/components/toast/toast-provider";
import { queryClient } from "../lib/tq/tq";
import { AppRoutes } from "./routes";
import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallback from "../design/components/error-fallback";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
