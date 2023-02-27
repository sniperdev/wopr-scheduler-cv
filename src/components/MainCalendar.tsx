import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const MainCalendar = () => {
  const [nextMonthDate, setNextMonthDate] = useState("");
  useEffect(() => {
    const getDate = () => {
      const today: Date = new Date();
      const firstDay: Date = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        2
      );
      setNextMonthDate(firstDay.toISOString().slice(0, 10));
    };
    getDate();
  });

  return (
    <section className="h-5/6 mx-2 mt-12">
      {nextMonthDate ? (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height={"100%"}
          initialDate={nextMonthDate}
        />
      ) : (
        <p>Nie udało się pobrać daty</p>
      )}
    </section>
  );
};

export default MainCalendar;
