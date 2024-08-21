import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const { register, success, error } = useAuth();

  const navigate = useNavigate();

  // Funktion för hantering av registreringsformulär från Context
  const handleRegister = async (e) => {
    e.preventDefault();

    register({
      username,
      password,
      email,
      avatar,
    });
  };

  return (
    <div>
      <h1>Registrera Ny Användare</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Avatar (URL):</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>

      <div className="redirect-to">
        <button className="btn-home" onClick={() => navigate("/")}></button>
      </div>
      <div className="success-error-message">
        <p className="success-message">{success}</p>
        <p className="error-message">{error}</p>
      </div>
    </div>
  );
};

export default Register;
