import React, { createContext, useContext, useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [usersToInvite, setUsersToInvite] = useState([]);
  const [conversationId, setConversationId] = useState(uuidv4());

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

  // Hämta användarprofil
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `https://chatify-api.up.railway.app/users/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Failed to load user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
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
