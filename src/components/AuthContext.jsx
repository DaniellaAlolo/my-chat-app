import React, { createContext, useContext, useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

// Skapa global context som heter AuthContext för delning av data
const AuthContext = createContext();

// Exportera useAuth funktionen för global användning av data
export const useAuth = () => {
  return useContext(AuthContext); // Hooken useContext för att få tillgång till värdena i AuthContext
};

const saveToken = (token) => {
  sessionStorage.setItem("token", token);
};

const saveUserData = (userData) => {
  sessionStorage.setItem("userData", JSON.stringify(userData));
};

const getToken = () => {
  return sessionStorage.getItem("token");
};

const getUserData = () => {
  const data = sessionStorage.getItem("userData");
  return data ? JSON.parse(data) : null;
};

const clearAuthData = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userData");
};

// AuthProvider komponent för att ge tillgång till AuthContext till barnkomponenter
export const AuthProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState("");
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Hämta token och användardata från sessionStorage när komponenten laddas
    const storedToken = getToken();
    const storedUser = getUserData();

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  //funktion för registrering av ny användare
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(
          "https://chatify-api.up.railway.app/csrf",
          {
            method: "PATCH",
          }
        );
        const data = await response.json();
        setCsrfToken(data.csrfToken); // Spara token i state
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
        setError("Failed to fetch CSRF token.");
      }
    };

    fetchCsrfToken();
  }, []);

  const register = async ({ username, password, email, avatar }) => {
    try {
      const response = await fetch(
        "https://chatify-api.up.railway.app/auth/register",
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

        if (errorData.error === "Username or email already exists") {
          setError("Username or email already exists, Try again");
        } else {
          setError(errorData.error || "Registartion failed");
        }
        return;
      }

      setSuccess("Registrering lyckades! Omdirigerar till login...");
      setError("");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setSuccess("");
    }
  };

  // Funktion för inlogging
  const login = async (username, password) => {
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

        // Spara token och användardata i sessionStorage
        saveToken(data.token);
        const decodedJwt = JSON.parse(
          atob(data.token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
        );
        saveUserData(decodedJwt);

        // Spara användarinfo i state
        setUser({
          id: decodedJwt.id,
          user: decodedJwt.user,
          avatar: decodedJwt.avatar,
          email: decodedJwt.email,
        });
        setToken(data.token);

        setSuccess("Inloggning lyckades! Omdirigerar till chat...");
        setError("");

        setTimeout(() => {
          navigate("/chat");
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Inloggning misslyckades");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Inloggning misslyckades");
    }
  };

  // Radera användare
  const deleteUser = async () => {
    try {
      const user = getUserData();
      const response = await fetch(
        `https://chatify-api.up.railway.app/users/${user.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        logout();
        navigate("/");
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  //Funktion för utloggning
  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  const isAuthenticated = () => {
    return !!getToken();
  };

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        register,
        login,
        logout,
        saveUserData,
        isAuthenticated,
        clearAuthData,
        sanitizeInput,
        deleteUser,
        getUserData,
        success,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
