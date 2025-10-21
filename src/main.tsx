import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

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
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset CSS styles MUI */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
