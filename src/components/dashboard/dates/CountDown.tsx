// src/components/dashboard/CountDown.tsx

import { useEffect, useState, useRef } from "react";

// Helper function to format a number with leading zero if less than 10
const formatNumber = (num: number) => String(num).padStart(2, '0');

function CountDown({
  targetDate,
  showFullCountdown = false,
  onCountdownEnd = () => {}, // New callback for when countdown hits zero
}: {
  targetDate: Date;
  showFullCountdown?: boolean;
  onCountdownEnd?: () => void;
}) {
  const targetTime = targetDate.getTime();
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetTime));
  const timerRef = useRef<number | null>(null); // To store interval ID
  const completionTimerRef = useRef<number | null>(null); // To store completion timeout ID

  function calculateTimeLeft(targetMs: number) {
    const now = new Date().getTime();
    const diff = Math.max(0, targetMs - now);

    if (diff <= 0) return null; // Date has passed

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { diff, days, hours, minutes, seconds };
  }

  useEffect(() => {
    // Clear any existing timers when targetDate changes or component mounts/unmounts
    if (timerRef.current) clearInterval(timerRef.current);
    if (completionTimerRef.current) clearTimeout(completionTimerRef.current);

    const updateCountdown = () => {
      const newTimeLeft = calculateTimeLeft(targetTime);
      setTimeLeft(newTimeLeft);

      if (!newTimeLeft) {
        // Countdown has reached 0 or passed
        clearInterval(timerRef.current!); // Stop the second-interval timer

        // Trigger onCountdownEnd after a small delay (e.g., 1 minute)
        // This delay allows the "You did it!" message to display for a bit
        if (!completionTimerRef.current) { // Prevent multiple timeouts
           completionTimerRef.current = window.setTimeout(() => {
              onCountdownEnd(); // Notify parent that the date is truly "done"
              completionTimerRef.current = null; // Clear ref after execution
           }, 60 * 1000); // 1 minute delay (adjust as needed)
        }
      }
    };

    // Set up the initial countdown
    updateCountdown();

    // Set up the interval for updates every second
    timerRef.current = window.setInterval(updateCountdown, 1000);

    // Cleanup function
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (completionTimerRef.current) clearTimeout(completionTimerRef.current);
    };
  }, [targetTime, onCountdownEnd]); // Depend on targetTime and onCountdownEnd


  // Display "Date completed" message if time is up, before onCountdownEnd triggers
  if (timeLeft === null) {
    return (
      <p className="text-white grid grid-cols-3 items-center text-center text-lg md:text-4xl font-semibold ">
        <img src="/celebrate.svg" alt="Celebrate" className="col-span-1 object-cover" />
        <span className="col-span-2">
          You did it! Date completed.
        </span>{" "}
      </p>
    );
  }

  // Determine if it's less than 2 days (48 hours)
  const isLessThan2Days = timeLeft.diff < (2 * 24 * 60 * 60 * 1000);

  // If showFullCountdown is explicitly true OR it's less than 2 days
  const shouldShowDetailedCountdown = showFullCountdown || isLessThan2Days;

  if (!shouldShowDetailedCountdown) {
    // Display only days countdown
    return (
      <p className="text-white grid grid-cols-3 items-center text-center text-lg md:text-4xl font-semibold ">
        <img
          src="/everywhere-together.svg"
          alt="Together"
          className="col-span-1 object-cover"
        />
        <span className="col-span-2">
          {timeLeft.days} days left to your amazing date!
        </span>{" "}
      </p>
    );
  }

  // Display full countdown
  const timeComponents = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  return (
    <div className="grid grid-cols-4 sm:gap-6 gap-2 text-white">
      {timeComponents.map((item, i) => (
        <span key={i} className="bg-accent/20 p-3 rounded-md text-center">
          <p className="font-semibold">{formatNumber(item.value)}</p>
          <p className="sm:text-base text-sm">{item.label}</p>
        </span>
      ))}
    </div>
  );
}

export default CountDown;