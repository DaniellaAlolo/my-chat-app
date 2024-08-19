/*import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SideNav.css"; // Skapa en separat CSS-fil för styling
import { useAuth } from "./AuthContext";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useState();
  const navigate = useNavigate();

  const toggleMenu = () => {
    console.log("Toggle Menu clicked"); // Lägg till detta
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`sidenav ${isOpen ? "open" : ""}`}>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/profile" onClick={toggleMenu}>
              Profile
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;*/
import React, { useState } from "react";
import { Link,  } from "react-router-dom";
import "../styles/SideNav.css"; // Skapa en separat CSS-fil för styling
import { useAuth } from "./AuthContext";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth(); // Använd useAuth för att få tillgång till logout
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`sidenav ${isOpen ? "open" : ""}`}>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/profile" onClick={toggleMenu}>
              Profile
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
