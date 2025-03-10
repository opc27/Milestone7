import React from "react";
import styles from "./InputDesign.module.css";

export const SpiritualThought: React.FC = () => (
  <article className={styles.spiritualThought}>
    <h2 className={styles.thoughtHeader}>Daily Spiritual Thought</h2>
    <p className={styles.thoughtContent}>
      23 And he went up from thence unto Bethel: and as he was going up by the
      way, there came forth little children out of the city, and mocked him, and
      said unto him, Go up, thou bald head; go up, thou bald head.
      <br />
      <br />
      24 And he turned back, and looked on them, and cursed them in the name of
      the Lord. And there came forth two she bears out of the wood, and tare
      forty and two children of them.
    </p>
    <p className={styles.thoughtReference}>2 Kings 2:23-24</p>
    <div className={styles.thoughtButtons}>
      <button className={styles.shareButton}>Share</button>
      <button className={styles.seeMore}>See More</button>
    </div>
  </article>
);
