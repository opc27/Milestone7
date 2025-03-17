import React, { useState } from "react";
import styles from "./InputDesign.module.css";

export const TempleCard: React.FC = () => {
  const [selectedTemple, setSelectedTemple] = useState(temples[0]); // Default to first temple

  const handleTempleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const temple = temples.find(t => t.name === event.target.value);
    if (temple) {
      setSelectedTemple(temple);
    }
  };

  return (
    <article className={styles.templeCard}>
      <img
        src={selectedTemple.image}
        alt={selectedTemple.name}
        className={styles.templeImage}
      />
      <div className={styles.templeInfo}>
        <h3 className={styles.templeName}>{selectedTemple.name}</h3>
        <p className={styles.daysCount}>158 days</p>
        <p className={styles.endowmentText}>until your endowment.</p>
      </div>

      {/* Select a temple from the dropdown */}
      <div className={styles.templeSelector}>
        <label htmlFor="temple-select">Choose a temple:</label>
        <select id="temple-select" onChange={handleTempleChange} value={selectedTemple.name}>
          {temples.map((temple) => (
            <option key={temple.name} value={temple.name}>
              {temple.name}
            </option>
          ))}
        </select>
      </div>
    </article>
  );
};

// List of temples with their names and image URLs
// These should probably be fetched from an API or database, but for now I've just put in a few for testing
const temples = [
  { name: "Anchorage Alaska Temple", image: "/images/anchorage_alaska_temple_lds.jpeg" },
  { name: "Denver Colorado Temple", image: "/images/denver_colorado_temple_grounds.jpeg" },
  { name: "Laie Hawaii Temple", image: "/images/laie_hawaii_temple_lds.jpeg" },
  { name: "Provo City Center Temple", image: "/images/provo_city_center_temple_exterior.jpeg" }
  ];
