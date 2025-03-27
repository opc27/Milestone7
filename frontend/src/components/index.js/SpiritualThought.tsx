import React from "react";
import styles from "./InputDesign.module.css";
import { useScripture } from "../../contexts/ScriptureContext";

export const SpiritualThought: React.FC = () => {
  const { scripture, loading, error, refreshScripture } = useScripture();

  // Format the scripture text to handle line breaks
  const formatScriptureText = (text: string) => {
    return text.split('\n').map((paragraph, index) => (
      <React.Fragment key={index}>
        {paragraph}
        {index < text.split('\n').length - 1 && (
          <>
            <br />
            <br />
          </>
        )}
      </React.Fragment>
    ));
  };

  return (
    <article className={styles.spiritualThought}>
      <h2 className={styles.thoughtHeader}>Daily Spiritual Thought</h2>
      
      {loading ? (
        <p className={styles.thoughtContent}>Loading scripture...</p>
      ) : error ? (
        <p className={styles.thoughtContent}>
          Could not load scripture. Please try again later.
        </p>
      ) : scripture ? (
        <>
          <p className={styles.thoughtContent}>
            {formatScriptureText(scripture.text)}
          </p>
          <p className={styles.thoughtReference}>{scripture.reference}</p>
        </>
      ) : (
        <p className={styles.thoughtContent}>No scripture available</p>
      )}
      
      <div className={styles.thoughtButtons}>
        <button className={styles.shareButton}>Share</button>
        <button 
          className={styles.seeMore} 
          onClick={() => refreshScripture()}
        >
          New Scripture
        </button>
      </div>
    </article>
  );
};
