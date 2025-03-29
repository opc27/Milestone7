import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon } from './Icons'; // Make sure this is the correct path
import styles from './Header.module.css'; // Make sure to create this CSS file
import { logout } from '../login/logout.ts';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <button
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <div className={styles.menuIconContainer}>
          <MenuIcon />
        </div>
      </button>

      <h1 className={styles.headerTitle}>Home</h1>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5746e2ba8de52487eba4d5a1dd05f3f0a50dcf6"
        alt="Profile"
        className={styles.avatar}
      />

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <Link
            to="/home"
            className={styles.menuItem}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/modules"
            className={styles.menuItem}
            onClick={() => setMenuOpen(false)}
          >
            Modules
          </Link>
          <Link
            to="/chatbot"
            className={styles.menuItem}
            onClick={() => setMenuOpen(false)}
          >
            Chatbot
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              logout();
            }}
            className={styles.menuItem}
          >
            Log Out
          </button>
        </div>
      )}
    </header>
  );
};
