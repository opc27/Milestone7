import { useState, useEffect } from "react";

const CountdownTimer = () => {
  //temporary for testing purposes
  const testDate = new Date();
  testDate.setDate(testDate.getDate() + 5); // 5 days in the future
  const defaultDate = testDate.toISOString().split("T")[0];

  // ==========================
  // STATE FOR TARGET DATE
  // ==========================
  const [targetDate, setTargetDate] = useState<string>(defaultDate); // This will be replaced later with user input
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number }>({
    days: 0,
    hours: 0,
  });

  //function to update timer
  const calculateTimeLeft = (date: string) => {
    const now = new Date();
    const eventDate = new Date(date);
    const difference = eventDate.getTime() - now.getTime();

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      });
    } else {
      setTimeLeft({ days: 0, hours: 0 }); // Stop at zero
    }
  };

  //update the timer
  useEffect(() => {
    if (!targetDate) return;

    calculateTimeLeft(targetDate);
    const interval = setInterval(() => calculateTimeLeft(targetDate), 60 * 60 * 1000); // Update every hour

    return () => clearInterval(interval);
  }, [targetDate]);

  // future code when infrastructure in place
  /*
  useEffect(() => {
    // Example: This could be replaced by a prop or context value later
    // The targetDate should be passed down as a prop or set from a global state
    setTargetDate(receivedDateFromApp); // Replace with actual date variable when available
  }, [receivedDateFromApp]); 
  */

  return (
    <div>
      <h2>Countdown Timer</h2>

      {/* TEMPORARY: Manual Input for Testing */}
      {/* This input field allows for testing purposes only. Once user input infrastructure is ready, remove this. */}
      <input
        type="date"
        onChange={(e) => setTargetDate(e.target.value)}
        value={targetDate}
      />

      <h3>{timeLeft.days} days, {timeLeft.hours} hours left</h3>
    </div>
  );
};

export default CountdownTimer;
