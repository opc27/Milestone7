import React from "react";
import { MenuIcon } from "./Icons";
import styles from "./InputDesign.module.css";

export const Header: React.FC = () => (
  <nav className={styles.header}>
    <button className={styles.menuButton} aria-label="Menu">
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
  </nav>
);
