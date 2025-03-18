import React from "react";
import styles from "./EventDesign.module.css";
import { Event } from "./types";

interface EditableEventListProps {
  events: Event[];
  onDeleteEvent: (id: number) => void;
  onEditEvent: (event: Event) => void;
  onAddEvent: () => void;
  onBackClick: () => void;
  onSaveChanges: () => void;
}

export const EditableEventList: React.FC<EditableEventListProps> = ({
  events,
  onDeleteEvent,
  onEditEvent,
  onAddEvent,
  onBackClick,
  onSaveChanges,
}) => {
  return (
    <section className={styles.editEventContainer}>
      <h2 className={styles.editEventTitle}>Edit Events</h2>
      <div className={styles.editEventGrid}>
        {events.map((event) => (
          <div className={styles.editEventItem} key={event.id}>
            <span>{event.name}</span>
            <span>{event.date}</span>
            <span>{event.time}</span>
            <span>{event.location}</span>
            <button
              className={styles.editItemButton}
              onClick={() => onEditEvent(event)}
            >
              Edit
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => onDeleteEvent(event.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className={styles.addButtonContainer}>
        <button className={styles.addButton} onClick={onAddEvent}>
          Add New Event
        </button>
      </div>
      <div className={styles.navigationButtons}>
        <button className={styles.backButton} onClick={onBackClick}>
          Back
        </button>
        <button className={styles.saveButton} onClick={onSaveChanges}>
          Save Changes
        </button>
      </div>
    </section>
  );
};
