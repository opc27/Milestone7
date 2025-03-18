"use client";
import { useState } from "react";
import styles from "../InputDesign.module.css";
import { EventList } from "./EventList";
import { EditableEventList } from "./EditableEventList.tsx";
import { EventForm } from "./EventForm.tsx";
import { Event, EventFormData } from "./types";

function UpcomingEvents() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const [eventTypes] = useState([
    "Mtg. w/ Bishop",
    "Mtg. w/ Stake Pres.",
    "Endowment",
  ]);

  const [temples] = useState([
    "Provo Temple",
    "Salt Lake Temple",
    "Draper Temple",
    "Mount Timpanogos Temple",
  ]);

  const [newEvent, setNewEvent] = useState<EventFormData>({
    type: "",
    temple: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: "Mtg. w/ Bishop",
      date: "7/13",
      time: "8:00 PM",
      location: "Bishop's Office",
      description: "Monthly meeting with Bishop Johnson",
    },
    {
      id: 2,
      name: "Mtg. w/ Stake Pres.",
      date: "7/20",
      time: "8:00 PM",
      location: "Stake Center",
      description: "Quarterly review with President Smith",
    },
    {
      id: 3,
      name: "Endowment",
      date: "7/27",
      time: "2:00 PM",
      location: "Temple",
      description: "Temple service with ward members",
    },
  ]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const openAddEventPopup = () => {
    setShowEventPopup(true);
    setIsEditing(false);
    setNewEvent({
      type: "",
      temple: "",
      date: "",
      time: "",
      location: "",
      description: "",
    });
  };

  const openEditEventPopup = (event: Event) => {
    setShowEventPopup(true);
    setIsEditing(true);
    setCurrentEvent(event);
    setNewEvent({
      type: event.name ?? "", // Ensure a valid string for `type`
      temple: event.temple ?? "",
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
    });
  };

  const closeEventPopup = () => {
    setShowEventPopup(false);
    setCurrentEvent(null);
  };

  const handleSaveEvent = () => {
    if (isEditing && currentEvent) {
      setEvents(
        events.map((event) =>
          event.id === currentEvent.id
            ? { ...newEvent, id: event.id, name: newEvent.type }
            : event,
        ),
      );
    } else {
      const newId = Math.max(...events.map((event) => event.id), 0) + 1;
      setEvents([...events, { ...newEvent, id: newId, name: newEvent.type }]);
    }
    closeEventPopup();
  };

  const handleSaveChanges = () => {
    toggleEditMode();
  };

  return (
    <main>
      {!isEditMode ? (
        <div className={styles.div}>
          <EventList events={events} onEditClick={toggleEditMode} />
        </div>
      ) : (
        <div className={styles.div}>
          <EditableEventList
            events={events}
            onDeleteEvent={deleteEvent}
            onEditEvent={openEditEventPopup}
            onAddEvent={openAddEventPopup}
            onBackClick={toggleEditMode}
            onSaveChanges={handleSaveChanges}
          />
        </div>
      )}

      {showEventPopup && (
        <EventForm
          isEditing={isEditing}
          eventData={newEvent}
          eventTypes={eventTypes}
          temples={temples}
          onCancel={closeEventPopup}
          onSave={handleSaveEvent}
          onChange={setNewEvent}
        />
      )}
    </main>
  );
}

export default UpcomingEvents;


