import React from "react";
import { ChatIcon } from "./Icons";
import styles from "./InputDesign.module.css";

export const BottomBar: React.FC = () => (
  <footer className={styles.bottomBar}>
    <div className={styles.progressBar}>
      <div className={styles.progressFill} />
    </div>
    <button className={styles.chatButton} aria-label="Chat">
      <ChatIcon />
    </button>
  </footer>
);
