"use client";
import * as React from "react";
import styles from "./ChatInterface.module.css";

export default function ChatInterface() {
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/P6k2Z-LRhgDZ50Hf2KmcK"
            width="100%"
            className={styles.chatbotIframe}
            frameBorder="0"
            title="Chatbot"
          ></iframe>
        </div>
      </div>
    </main>
  );
}
