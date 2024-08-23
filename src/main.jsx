import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import App from "./components/App";
import "./styles/SideNav.css";

// Skapa en root för React
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendera appen med AuthProvider och Router
root.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
