import React from "react";
import { StatusIcons } from "./Icons";
import styles from "./InputDesign.module.css";

export const StatusBar: React.FC = () => (
  <header className={styles.statusBar}>
    <time className={styles.time}>9:41</time>
    <div className={styles.dynamicIslandSpacer} />
    <div>
      <StatusIcons />
    </div>
  </header>
);
