import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import styles from "../styles/Style.module.css";

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
    <div className={styles.container}>
      <h1>Registrera Ny Användare</h1>
      <form className={styles.form} onSubmit={handleRegister}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Username:</label>
          <input
            type="text"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Password:</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Avatar (URL):</label>
          <input
            type="text"
            className={styles.input}
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>

      <div className={styles.redirektTo}>
        <button className={styles.registerButton} onClick={() => navigate("/")}>
          Login
        </button>
      </div>
      <div className={styles.messageContainer}>
        <p className={styles.successMessage}>{success}</p>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    </div>
  );
};

export default Register;
