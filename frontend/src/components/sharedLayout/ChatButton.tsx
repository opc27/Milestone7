"use client";
import { useNavigate } from "react-router-dom";
import styles from "../chatbot/ChatInterface.module.css"; // Keep the correct import for styles

export const ChatButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/chatbot"); // Correct path to navigate to the chatbot route
  };

  return (
    <button className={styles.sendButton} onClick={handleClick}>
      <div className={styles.sendIconWrapper}>
        <div className={styles.sendIcon}>
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.3228 22.3059V4.30591C22.3228 3.75591 22.1269 3.28507 21.7353 2.89341C21.3436 2.50174 20.8728 2.30591 20.3228 2.30591H4.32275C3.77275 2.30591 3.30192 2.50174 2.91025 2.89341C2.51859 3.28507 2.32275 3.75591 2.32275 4.30591V16.3059C2.32275 16.8559 2.51859 17.3267 2.91025 17.7184C3.30192 18.1101 3.77275 18.3059 4.32275 18.3059H18.3228L22.3228 22.3059Z" fill="#FFF9FF"></path></svg>',
            }}
          />
        </div>
      </div>
    </button>
  );
};

