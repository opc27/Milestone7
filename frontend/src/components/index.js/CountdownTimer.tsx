import { useState, useEffect } from "react";
import { Event } from "./Events/types";

interface CountdownTimerProps {
  event: Event; // Pass the event as a prop to the component
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ event }) => {
  // ==========================
  // STATE FOR TARGET DATE
  // ==========================
  const [targetDate, setTargetDate] = useState<string | null>(null); 
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number }>({
    days: 0,
    hours: 0,
  });

  // Set the target date based on the event type
  useEffect(() => {
    console.log("Received event in CountdownTimer:", event);
    if (event && event.eventType === "Endowment") {
      // Fix here: Use event.eventDate instead of event.date
      console.log("Setting targetDate to:", event.eventDate);
      setTargetDate(event.eventDate); // Use event.eventDate here
    }
  }, [event]);
  
  

  // Function to update the timer
  const calculateTimeLeft = (date: string) => {
    const now = new Date();
    const eventDate = new Date(date);
    const difference = eventDate.getTime() - now.getTime();
    console.log("Event date received:", event.date);

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      });
    } else {
      setTimeLeft({ days: 0, hours: 0 }); // Stop at zero
    }
  };

  // Update the timer every hour
  useEffect(() => {
    if (!targetDate) return;

    calculateTimeLeft(targetDate);
    const interval = setInterval(() => calculateTimeLeft(targetDate), 60 * 60 * 1000); // Update every hour

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div>
      {targetDate ? (
        <h3>{timeLeft.days} days, {timeLeft.hours} hours left</h3>
      ) : (
        <p>No upcoming Endowment event.</p>
      )}
    </div>
  );
};

export default CountdownTimer;
