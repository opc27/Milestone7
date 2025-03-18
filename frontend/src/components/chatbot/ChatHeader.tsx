import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ChatInterface.module.css";

export const ChatHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.chatHeader}>
      <div className={styles.headerContent}>
        {/* Menu Button */}
        <button className={styles.menuButton} onClick={toggleMenu} aria-label="Menu">
          <div className={styles.menuIconWrapper}>
            <div className={styles.menuIcon}>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    '<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.82275 18.8059V16.8059H21.8228V18.8059H3.82275ZM3.82275 13.8059V11.8059H21.8228V13.8059H3.82275ZM3.82275 8.80591V6.80591H21.8228V8.80591H3.82275Z" fill="#006D3A"></path></svg>',
                }}
              />
            </div>
          </div>
        </button>

        <h1 className={styles.chatTitle}>Chatbot</h1>

        {/* Profile Avatar */}
        <div className={styles.avatarWrapper}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1baed582fb419063db7873c1068bc541e1c23c0e"
            alt="Avatar"
            className={styles.avatar}
          />
        </div>
      </div>

      {/* Dropdown Menu (Only Shows if menuOpen is true) */}
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <Link to="/" className={styles.menuItem}>Home</Link>
          <Link to="/modules" className={styles.menuItem}>Modules</Link>
          <Link to="/chatbot" className={styles.menuItem}>Chatbot</Link>
          <Link to="/logout" className={styles.menuItem}>Log Out</Link>
        </div>
      )}
    </header>
  );
};
