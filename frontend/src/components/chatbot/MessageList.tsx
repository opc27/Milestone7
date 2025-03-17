import React from "react";
import styles from "./ChatInterface.module.css";
import { ChatMessage } from "./ChatMessage";

export const MessageList = () => {
  return (
    <section className={styles.messageList}>
      <div className={styles.messageContainer}>
        <ChatMessage
          sender="Russell"
          isBot={true}
          message="Hello Anna Marie! I'm Russell, your temple prep companion! How can I help you today?"
        />
        <ChatMessage
          sender="You"
          isBot={false}
          message="Hello Russell! Why do we have temples? Where did they come from?"
        />
        <ChatMessage
          sender="Russell"
          isBot={true}
          imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/9da48ef6fd7826b532f3fbdc7e4e7113d89f7f83"
          altText="Response"
        />
        <ChatMessage
          sender="You"
          isBot={false}
          message="Thank you! Do you know any good resources that I could use to help me learn more?"
        />
        <ChatMessage
          sender="Russell"
          isBot={true}
          imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/57fa0dda869a3ea445c179f74dffaa937fbeadfd"
          altText="Resources"
        />
      </div>
    </section>
  );
};
