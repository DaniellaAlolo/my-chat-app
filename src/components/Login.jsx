import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import styles from "../styles/Style.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, setSuccess, setError, success, error } = useAuth(); // Hämta login,success, error från context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // ANVÄND DETTA OM USEAUTH FUNKAR
    login(username, password);
  };

  useEffect(() => {
    setSuccess("");
    setError("");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Welcome to Bubbis Chat</h1>
        <h2>Login</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username:"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password:"
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>

        <div className={styles.redirectTo}>
          <button
            className={styles.registerButton}
            onClick={() => navigate("/register")}
          >
            Regiser
          </button>
        </div>
        <div className={styles.messageContainer}>
          <p className={styles.successMessage}>{success}</p>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </div>
    </div>
  );
};
export default Login;
