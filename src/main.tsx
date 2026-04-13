import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Define a simple theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50",
    },
    secondary: {
      main: "#FF9800",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Reset CSS styles MUI */}
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
