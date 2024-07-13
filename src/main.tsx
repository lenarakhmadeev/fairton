import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "./styles/globals.css";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";


// this manifest is used temporarily for development purposes
const manifestUrl =
    "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json";

const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            <QueryClientProvider client={queryClient}>
              <Provider>
                <App />
              </Provider>
            </QueryClientProvider>
        </TonConnectUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
