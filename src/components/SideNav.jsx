import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import styles from "../styles/Style.module.css";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth(); // Använd useAuth för att få tillgång till logout

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu(); // Stäng menyn när du loggar ut
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Kontrollera om klicket är utanför sidenav
      if (
        event.target.closest(`.${styles.sidenav}`) === null &&
        !event.target.closest(`.${styles.hamburger}`)
      ) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </button>
      <div className={`${styles.sidenav} ${isOpen ? styles.open : ""}`}>
        <nav className={styles.menu}>
          <ul>
            <li>
              <Link to="/profile" onClick={closeMenu}>
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
    </>
  );
};

export default SideNav;
