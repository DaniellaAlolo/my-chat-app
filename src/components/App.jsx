import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./Login";
import Chat from "./Chat";
import Register from "./Register";
import Profile from "./Profile";

import ProtectedRoutes from "../utils/ProtectedRoutes";

const App = () => {
  return (
    <AuthProvider>
      <div className="parent">
     
      
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoutes>
                <Chat />
              </ProtectedRoutes>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      </div>
    </AuthProvider>
  );
};

export default App;
