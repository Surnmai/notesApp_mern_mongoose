import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// import react router
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./Context/index.jsx";

// import Context Provider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </StrictMode>
);
