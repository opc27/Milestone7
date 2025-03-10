import React from "react";
import styles from "./InputDesign.module.css";

export const WelcomeSection: React.FC = () => (
  <section className={styles.welcomeSection}>
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/50ffd3b72685cf0cc9e821fc035ac91a719019d2"
      alt="Profile"
      className={styles.profileImage}
    />
    <div className={styles.welcomeText}>
      <h2 className={styles.welcome}>Welcome</h2>
      <p className={styles.name}>Anna Marie</p>
    </div>
  </section>
);
