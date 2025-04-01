import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          theme={{
            colors: {
              dark: [
                '#111827', // Dark Background
                '#111827',
                '#111827',
                '#111827',
                '#111827',
                '#111827',
                '#111827',
                '#111827',
                '#111827',
                '#111827',
              ],
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <App />
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
