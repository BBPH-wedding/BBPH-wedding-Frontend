"use client";

import Button from "@/components/Button";
import Titles from "@/components/Titles";
import { CalendarDays } from "lucide-react";
import { useState, useEffect } from "react";

const Calendar = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2025-02-01T00:00:00-05:00");
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCalendarRedirect = () => {
    window.open(
      "https://calendar.google.com/calendar/u/0/r/eventedit?dates=20250201T000000Z/20250201T235959Z&text=Wedding+Party+of+Bekky+%26+Nicolas&details=Join+us+to+celebrate+the+love+of+Bekky+and+Nicolas.+Dress+code%3A+formal+attire+and+get+ready+for+a+night+of+dancing%2C+laughter%2C+and+unforgettable+memories.",
      "_blank"
    );
  };

  return (
    <section className="flex flex-col items-center justify-center h-auto py-24 text-center bg-primaryGreen">
      <div className="mx-[1rem]">
        <div>
          <Titles title="Our Day" />
          <p className="mt-5 text-xl">Saturday, February 1st, 2025</p>
        </div>

        <div className="flex gap-x-[5vw] mt-28 lg:gap-x-[11vw] sm:flex-nowrap flex-wrap justify-center ml-[4.5vw]">
          <div>
            <h2 className="font-[cormorant] text-6xl lg:text-8xl">
              {timeLeft.days.toString().padStart(2, "0")}
            </h2>
            <p className="text-[10px] tracking-[0.5rem] mt-4 lg:text-xl sm:text-sm">
              DAYS
            </p>
          </div>

          <div>
            <h2 className="font-[cormorant] text-6xl lg:text-8xl">
              {timeLeft.hours.toString().padStart(2, "0")}
            </h2>
            <p className="text-[10px] sm:text-sm lg:text-xl tracking-[0.5rem] mt-4">
              HOURS
            </p>
          </div>

          <div>
            <h2 className="font-[cormorant] text-6xl lg:text-8xl">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </h2>
            <p className="text-[10px] sm:text-sm lg:text-xl tracking-[0.5rem] mt-4">
              MINUTES
            </p>
          </div>

          <div>
            <h2 className="font-[cormorant] text-6xl lg:text-8xl">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </h2>
            <p className="text-[10px] sm:text-sm lg:text-xl tracking-[0.5rem] mt-4">
              SECONDS
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleCalendarRedirect}>
            <CalendarDays className="mr-6 mt-[-3px]" />
            ADD TO CALENDAR
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
