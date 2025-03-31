import React, { useState, useEffect } from "react";
import styles from "./InputDesign.module.css";
import { Event } from "./Events/types";
import CountdownTimer from "./CountdownTimer";

export const TempleCard: React.FC = () => {
  console.log("TempleCard component is rendering");
  const [selectedTemple, setSelectedTemple] = useState(temples[0]); // Default to first temple
  const [endowmentEvent, setEndowmentEvent] = useState<Event | null>(null);

  const handleTempleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const temple = temples.find((t) => t.name === event.target.value);
    if (temple) {
      setSelectedTemple(temple);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      console.log("fetchEvents function is running");
      try {
        const res = await fetch("https://localhost:5000/Events", {
          credentials: "include",
          headers: {
            "X-Username": "testuser", // Add your user identifier if needed
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch events: ${res.status}`);
        }

        const data: Event[] = await res.json();

        console.log("Fetched events:", JSON.stringify(data, null, 2));

        // Find the "Endowment" event type
        const foundEvent = data.find((event) => event.eventType === "Endowment");

        console.log("Found endowment event:", foundEvent);

        setEndowmentEvent(foundEvent || null);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []); // Run only once when the component mounts

  return (
    <article className={styles.templeCard}>
      <img
        src={selectedTemple.image}
        alt={selectedTemple.name}
        className={styles.templeImage}
      />
      <div className={styles.templeInfo}>
        <h3 className={styles.templeName}>{selectedTemple.name}</h3>
        {endowmentEvent ? (
          <CountdownTimer event={endowmentEvent} />
        ) : (
          <p>No upcoming Endowment event.</p>
        )}
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
const temples = [
  { name: "Anchorage Alaska Temple", image: "/images/anchorage_alaska_temple_lds.jpeg" },
  { name: "Denver Colorado Temple", image: "/images/denver_colorado_temple_grounds.jpeg" },
  { name: "Laie Hawaii Temple", image: "/images/laie_hawaii_temple_lds.jpeg" },
  { name: "Provo City Center Temple", image: "/images/provo_city_center_temple_exterior.jpeg" }
];
