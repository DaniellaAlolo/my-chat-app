import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [csrfToken, setCsrfToken] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://chatify-api.up.railway.app/csrf', {
      method: 'PATCH',
    })
      .then(res => res.json())
      .then(data => {
        setCsrfToken(data.csrfToken); // Spara token i state
      })
      .catch(error => {
        console.error('Failed to fetch CSRF token:', error);
        setError('Failed to fetch CSRF token.');
      });
  }, []);

  // Funktion för hantering av registreringsformulär med fetch
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
     
      // Skicka registreringsbegäran
      const response = await fetch(
        'https://chatify-api.up.railway.app/auth/register ',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            email,
            avatar,
            _csrf: csrfToken,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      console.log("Server Response:", response);

      // Om registreringen lyckas, visa framgångsmeddelande och omdirigera till login
      setSuccess("Registrering lyckades! Omdirigerar till login...");
      setError("");
      setTimeout(() => {
        navigate("/");
      }, 2000); // Vänta 2 sekunder innan omdirigering
    } catch (error) {
      // Hantera fel
      setError(error.message || "Registreringen misslyckades. Försök igen.");
      setSuccess("");
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <h1>Registrera</h1>
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
      <button className="btn-home" onClick={() => navigate("/")}>
        
      </button>
      </div>
    </div>

    
  );
};

export default Register;
