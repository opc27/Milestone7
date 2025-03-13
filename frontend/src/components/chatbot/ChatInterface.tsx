"use client";
import * as React from "react";
import styles from "./ChatInterface.module.css";
import { StatusBar } from "./StatusBar";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";

export default function ChatInterface() {
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <StatusBar />
          <ChatHeader />
          <MessageList />
          <ChatInput />
        </div>
      </div>
    </main>
  );
}
