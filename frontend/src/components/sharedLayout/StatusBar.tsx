import React, { useState, useEffect } from "react";
import { StatusIcons } from "./Icons";
import styles from "./InputDesign.module.css";

export const StatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <header className={styles.statusBar}>
      <time className={styles.time}>{formattedTime}</time>
      <div className={styles.dynamicIslandSpacer} />
      <div>
        <StatusIcons />
      </div>
    </header>
  );
};

