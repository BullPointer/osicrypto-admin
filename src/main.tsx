import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import { AppProvider } from "./context/AppContext.js";
import "./index.css";
import { EditorContextProvider } from "./context/EditorContext.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AppProvider>
    <EditorContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </EditorContextProvider>
  </AppProvider>
);
