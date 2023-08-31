import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import { AppProvider } from "./context/AppContext.js";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AppProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </AppProvider>
);
