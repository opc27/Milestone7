import React from "react";
import styles from "./InputDesign.module.css";

export const TempleCard: React.FC = () => (
  <article className={styles.templeCard}>
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7637a7729f8811c62b926ed6a21e7a5f32cca7d"
      alt="Temple"
      className={styles.templeImage}
    />
    <div className={styles.templeInfo}>
      <h3 className={styles.templeName}>Arequipa Peru Temple</h3>
      <p className={styles.daysCount}>158 days</p>
      <p className={styles.endowmentText}>until your endowment.</p>
    </div>
  </article>
);
