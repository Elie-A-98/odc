import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../design/styling/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { worker } from "../api/msw/browser.ts";
async function startMsw() {
  const { worker } = await import("../api/msw/browser.ts");
  return worker.start();
}
worker.start();
startMsw().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
});
