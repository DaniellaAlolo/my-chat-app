import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, success, error } = useAuth(); // Hämta login,success, error från context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // ANVÄND DETTA OM USEAUTH FUNKAR
    login(username, password);
  };

  return (
    <div>
      <h1>Logga in</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Användarnamn:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Lösenord:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Logga in</button>
      </form>

      <div className="redirect-to">
        <button className="btn-regiter" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
      <div className="success-error-message">
        <p className="success-message">{success}</p>
        <p className="error-message">{error}</p>
      </div>
    </div>
  );
};

export default Login;
