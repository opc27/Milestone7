import React from "react";
import styles from "./EventDesign.module.css";
import { Event } from "./types";

interface EventListProps {
  events: Event[];
  onEditClick: () => void;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  onEditClick,
}) => {
  return (
    <section className={styles.eventContainer}>
      <h2 className={styles.eventTitle}>Upcoming Events</h2>
      <div className={styles.eventGrid}>
        {events.map((event) => (
          <div className={styles.eventItem} key={event.id}>
            <span>{event.name}</span>
            <span>{event.date}</span>
            <span>{event.time}</span>
          </div>
        ))}
      </div>
      <div className={styles.actionButtonContainer}>
        <button className={styles.editButton} onClick={onEditClick}>
          Edit Events
        </button>
      </div>
    </section>
  );
};