import React from "react";
import styles from "./EventDesign.module.css";
import { EventFormData } from "./types";

interface EventFormProps {
  isEditing: boolean;
  eventData: EventFormData;
  eventTypes: string[];
  temples: string[];
  onCancel: () => void;
  onSave: () => void;
  onChange: (data: EventFormData) => void;
}

export const EventForm: React.FC<EventFormProps> = ({
  isEditing,
  eventData,
  eventTypes,
  temples,
  onCancel,
  onSave,
  onChange,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>
          {isEditing ? "Edit Event" : "Add New Event"}
        </h3>
        <form className={styles.eventForm}>
          <select
            className={styles.formSelect}
            value={eventData.type}
            onChange={(e) => onChange({ ...eventData, type: e.target.value })}
          >
            <option value="">Select Event Type</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {eventData.type === "Endowment" && (
            <select
              className={styles.formSelect}
              value={eventData.temple}
              onChange={(e) =>
                onChange({ ...eventData, temple: e.target.value })
              }
            >
              <option value="">Select Temple</option>
              {temples.map((temple) => (
                <option key={temple} value={temple}>
                  {temple}
                </option>
              ))}
            </select>
          )}

          <input
            type="date"
            className={styles.formInput}
            value={eventData.date}
            onChange={(e) => onChange({ ...eventData, date: e.target.value })}
          />

          <input
            type="time"
            className={styles.formInput}
            value={eventData.time}
            onChange={(e) => onChange({ ...eventData, time: e.target.value })}
          />

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.saveModalButton}
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
