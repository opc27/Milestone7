"use client";
import { useEffect, useState } from "react";
import styles from "../InputDesign.module.css";
import { EventList } from "./EventList";
import { EditableEventList } from "./EditableEventList";
import { EventForm } from "./EventForm";
import { Event, EventFormData } from "./types";

function UpcomingEvents() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Other states for eventTypes, temples, and newEvent as before
  const [eventTypes] = useState([
    "Mtg. w/ Bishop",
    "Mtg. w/ Stake Pres.",
    "Endowment",
  ]);

  const [newEvent, setNewEvent] = useState<EventFormData>({
    type: "",
    date: "",
    time: "",
  });

  // Fetch events from the backend on component mount.
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://localhost:5000/Events", {
          credentials: 'include',
          headers: {
            "X-Username": "testuser",
          },
        });
        
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Authentication failed - check username header");
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Raw API response:", data);

        // Map and sort events by date
        const mappedEvents = data.map((evt: any) => {
          const eventDate = new Date(evt.eventDate + 'T00:00:00');
          return {
            id: evt.eventId,
            name: evt.eventType,
            date: eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            time: evt.time || "",
            rawDate: eventDate // Add raw date for sorting
          };
        }).sort((a: { rawDate: Date }, b: { rawDate: Date }) => a.rawDate.getTime() - b.rawDate.getTime());

        setEvents(mappedEvents);
      } catch (error: any) {
        console.error("Fetch error:", error);
        setError(error.message);
      }
    };

    fetchEvents();
  }, []);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const deleteEvent = async (id: number) => {
    try {
      const res = await fetch(`https://localhost:5000/Events/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          "X-Username": "testuser",
        },
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error#1! status: ${res.status}`);
      }
      
      setEvents(events.filter((event) => event.id !== id));
    } catch (error: any) {
      console.error("Delete error:", error);
      setError(error.message);
    }
  };

  const openAddEventPopup = () => {
    setShowEventPopup(true);
    setIsEditing(false);
    setNewEvent({
      type: "",
      date: "",
      time: "",
    });
  };

  const openEditEventPopup = (event: Event) => {
    setShowEventPopup(true);
    setIsEditing(true);
    setCurrentEvent(event);
    
    // Convert the short date format back to a full date for the form
    const [month, day] = event.date.split(' ');
    const currentYear = new Date().getFullYear();
    const fullDate = new Date(`${month} ${day}, ${currentYear}`).toISOString().split('T')[0];
    
    setNewEvent({
      type: event.name ?? "",
      date: fullDate,
      time: event.time ?? "",
    });
  };

  const closeEventPopup = () => {
    setShowEventPopup(false);
    setCurrentEvent(null);
  };

  const handleSaveEvent = async () => {
    try {
      // Create date in local timezone without timezone conversion
      const selectedDate = new Date(newEvent.date + 'T00:00:00');
      
      const eventData = {
        eventType: newEvent.type,
        eventDate: selectedDate.toISOString().split('T')[0],
        time: newEvent.time,
      };

      const url = isEditing && currentEvent 
        ? `https://localhost:5000/Events/${currentEvent.id}`
        : 'https://localhost:5000/Events';
      
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "X-Username": "testuser",
        },
        body: JSON.stringify(eventData),
      });

      // if (!res.ok) {
      //   throw new Error(`HTTP error2! status: ${res.status}`);
      // }

      // Close the popup first
      setShowEventPopup(false);
      setCurrentEvent(null);
      
      // Then reload the page
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error: any) {
      console.error("Save error:", error);
      setError(error.message);
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Refresh the events list
      const res = await fetch("https://localhost:5000/Events", {
        credentials: 'include',
        headers: {
          "X-Username": "testuser",
        },
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const mappedEvents = data.map((evt: any) => {
        const eventDate = new Date(evt.eventDate + 'T00:00:00');
        return {
          id: evt.eventId,
          name: evt.eventType,
          date: eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          time: evt.time || "",
          rawDate: eventDate // Add raw date for sorting
        };
      }).sort((a: { rawDate: Date }, b: { rawDate: Date }) => a.rawDate.getTime() - b.rawDate.getTime());

      setEvents(mappedEvents);
      toggleEditMode();
    } catch (error: any) {
      console.error("Refresh error:", error);
      setError(error.message);
    }
  };

  return (
    <main>
      {error && <div>Error: {error}</div>}
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
          onCancel={closeEventPopup}
          onSave={handleSaveEvent}
          onChange={setNewEvent}
        />
      )}
    </main>
  );
}

export default UpcomingEvents;