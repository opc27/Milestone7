import React from "react";
import styles from "./ChatInterface.module.css";

interface ChatMessageProps {
  sender: string;
  message?: string;
  imageUrl?: string;
  altText?: string;
  isBot: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  message,
  imageUrl,
  altText,
  isBot,
}) => {
  return (
    <article className={isBot ? styles.botMessage : styles.userMessage}>
      <h2 className={styles.messageSender}>{sender}</h2>
      {message ? (
        <p
          className={
            isBot ? styles.botMessageContent : styles.userMessageContent
          }
        >
          {message}
        </p>
      ) : imageUrl ? (
        <div className={styles.botMessageContent}>
          <img src={imageUrl} alt={altText} className={styles.messageImage} />
        </div>
      ) : null}
    </article>
  );
};
