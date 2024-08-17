//TEST MED STORAGE.JS + LOGIN.JSX
import React, { useState } from "react";
import { saveToken, saveDecodedUserData } from "./storage";
import { useNavigate } from "react-router-dom";
import fakeAuth from "../utils/fakeAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://chatify-api.up.railway.app/auth/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { token, userId, username, avatar } = data;

        // Spara token och användardata i localStorage
        saveToken(token);
        const decodedJwt = JSON.parse(
          atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
        );
        saveDecodedUserData(decodedJwt);

        fakeAuth.signIn(() => {
          setSuccess("Inloggning lyckades! Omdirigerar till chat...");
          setError("");
          setTimeout(() => {
            navigate("/chat");
          }, 2000);
        });

        // Redirecta till chatten eller annan sida
        setSuccess("Inloggning lyckades! Omdirigerar till chat...");
        setError("");
        setTimeout(() => {
          navigate("/chat");
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Inloggning misslyckades");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Inloggning misslyckades");
    }
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
      <button className="btn-home" onClick={() => navigate("/")}>
        Go Home
      </button></div>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
