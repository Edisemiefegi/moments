// src/components/dashboard/DateInfoCard.tsx

import Card from "@/components/base/Card";
import CountDown from "./CountDown";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react"; 
import { useStore } from "@/store/Store";
import { useNavigate } from "react-router-dom";
import type { DateType } from "@/types";

const ROTATION_INTERVAL_MINUTES = 2; 

function DateInfoCard() {
  const { dates } = useStore();
  const navigate = useNavigate();

  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const [upcomingDates, setUpcomingDates] = useState<DateType[]>([]);
  const rotationTimerRef = useRef<number | null>(null); 

  const getSortedUpcomingDates = useCallback((allDates: DateType[]) => {
    const now = new Date();
    return allDates
      .filter(
        (date) =>
          date.status === "confirmed" &&
          new Date(date.date).getTime() > now.getTime()
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, []);

  useEffect(() => {
    setUpcomingDates(getSortedUpcomingDates(dates));
    setCurrentDateIndex(0); 
  }, [dates, getSortedUpcomingDates]);

  const advanceToNextDate = useCallback(() => {
    setUpcomingDates((prevDates) => {
      const now = new Date();
      const freshUpcoming = prevDates
        .filter((date) => new Date(date.date).getTime() > now.getTime())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      if (freshUpcoming.length === 0) {
        setCurrentDateIndex(0); 
        return [];
      }

      setCurrentDateIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % freshUpcoming.length;
        return nextIndex;
      });
      return freshUpcoming;
    });
  }, []);


  useEffect(() => {
    if (rotationTimerRef.current) {
      clearInterval(rotationTimerRef.current);
    }

    if (upcomingDates.length <= 1) {
      return;
    }

    rotationTimerRef.current = window.setInterval(() => {
      advanceToNextDate();
    }, ROTATION_INTERVAL_MINUTES * 60 * 1000);

    return () => {
      if (rotationTimerRef.current) clearInterval(rotationTimerRef.current);
    };
  }, [upcomingDates.length, advanceToNextDate]);


  const nextDate = upcomingDates[currentDateIndex];

  const handleCountdownEnd = useCallback(() => {
    // console.log(`Countdown for ${nextDate?.title} fully ended. Advancing...`);
    advanceToNextDate();

    if (rotationTimerRef.current) {
      clearInterval(rotationTimerRef.current);
    }
    rotationTimerRef.current = window.setInterval(() => {
      advanceToNextDate();
    }, ROTATION_INTERVAL_MINUTES * 60 * 1000);

  }, [nextDate, advanceToNextDate]);


  if (!nextDate) {
    return (
      <Card className="bg-primary/90! p-6 text-white text-center">
        <p className="text-sm">No upcoming dates yet 💔</p>
        <p className="text-xs opacity-80">
          Plan something cute and make it happen.
        </p>
        <Button
          onClick={() => navigate("/dashboard/dates")}
          className="bg-white dark:text-primary text-primary mt-4"
        >
          Plan a Date
        </Button>
      </Card>
    );
  }

  const targetDateAsDate = nextDate.date instanceof Date ? nextDate.date : new Date(nextDate.date);

  return (
    <Card className="bg-primary/90! space-y-6">
      <div className="space-y-1">
        <p className="text-sm text-white">Next Date</p>
        <p className="text-xl font-semibold text-white">{nextDate.title}</p>
        <p className="text-sm text-white">
          with {nextDate.sendTo} · {nextDate.location}
        </p>
      </div>

      <CountDown
        targetDate={targetDateAsDate}
        showFullCountdown={false}
        onCountdownEnd={handleCountdownEnd} 
      />

      <Button
        onClick={() => navigate(`/dashboard/dates/${nextDate.id}`)}
        className="bg-white dark:text-primary text-primary"
      >
        <Heart />
        View Details
      </Button>
    </Card>
  );
}

export default DateInfoCard;