"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
}

export function Timer({ duration, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center py-4 text-lg font-semibold bg-[#0052CC] text-white">
      Hurry up! The time is clocking {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </div>
  );
}
