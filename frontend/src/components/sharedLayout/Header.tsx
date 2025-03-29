import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuIcon } from "./Icons"; // Make sure this is the correct path
import styles from "./Header.module.css"; // Make sure to create this CSS file
import { logout } from '../login/logout.ts';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get the current route

  // Function to toggle the dropdown menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Extract the last part of the path to determine the page name
  const pageTitle = location.pathname.split('/').pop();
  
  // Check if the current route is a module page (e.g., /modules/1, /modules/2, ...)
  let formattedTitle = 'Home';
  
  if (location.pathname.startsWith('/modules')) {
    if (pageTitle && !isNaN(Number(pageTitle))) {
      formattedTitle = `Module ${pageTitle}`; // e.g., "Module 1"
    } else {
      formattedTitle = 'Modules'; // e.g., "/modules" page
    }
  } else if (pageTitle) {
    formattedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
  }

  return (
    <header className={styles.header}>
      <button className={styles.menuButton} onClick={toggleMenu} aria-label="Menu">
        <div className={styles.menuIconContainer}>
          <MenuIcon />
        </div>
      </button>

      <h1 className={styles.headerTitle}>{formattedTitle}</h1>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5746e2ba8de52487eba4d5a1dd05f3f0a50dcf6"
        alt="Profile"
        className={styles.avatar}
      />

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <Link to="/home" className={styles.menuItem}>Home</Link>
          <Link to="/modules" className={styles.menuItem}>Modules</Link>
          <Link to="/chatbot" className={styles.menuItem}>Chatbot</Link>
          <button onClick={logout} className={styles.menuItem}>Log Out</button>
        </div>
      )}
    </header>
  );
};
