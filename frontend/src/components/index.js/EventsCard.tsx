import React from "react";
import { EventItem } from "./types";
import styles from "./InputDesign.module.css";

const events: EventItem[] = [
  { name: "Mtg. w/ Bishop", date: "7/13", time: "8:00 PM" },
  { name: "Mtg. w/ Stake Pres.", date: "7/20", time: "8:00 PM" },
  { name: "Endowment", date: "7/27", time: "2:00 PM" },
];

export const EventsCard: React.FC = () => (
  <section className={styles.eventsCard}>
    <h2 className={styles.eventsHeader}>Upcoming Events</h2>
    <div>
      {events.map((event, index) => (
        <div key={index} className={styles.eventItem}>
          <span>{event.name}</span>
          <span>{event.date}</span>
          <span>{event.time}</span>
        </div>
      ))}
    </div>
    <div className={styles.eventsButtons}>
      <button className={styles.newEvent}>New Event</button>
      <button className={styles.editEvent}>Edit Event</button>
    </div>
  </section>
);
