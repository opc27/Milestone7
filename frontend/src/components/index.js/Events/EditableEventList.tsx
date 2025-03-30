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
  const displayEventType = (type: string) => {
    return type === "Endowment" ? "Endow" : type;
  };

  return (
    <section className={styles.editEventContainer}>
      <h2 className={styles.editEventTitle}>Edit Events</h2>
      <div className={styles.editEventGrid}>
        <div className={styles.editEventItem}>
          <span style={{ fontWeight: 'bold' }}>Date</span>
          <span style={{ fontWeight: 'bold' }}>Event Type</span>
          <span style={{ fontWeight: 'bold' }}>Edit</span>
          <span style={{ fontWeight: 'bold' }}>Delete</span>
        </div>
        {events.map((event) => (
          <div className={styles.editEventItem} key={event.id}>
            <span>{event.date}</span>
            <span>{displayEventType(event.name)}</span>
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
