import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { User } from "../interfaces/User";

interface props {
  user: User;
}

function MainReadyShifts({ user }: props) {
  const [dates, setDates] = useState();

  useEffect(() => {
    const fetchDates = async () => {
      await fetch("http://localhost:8800/api/dates/getreadysshifts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.map(
            (element: { TITLE: string; START: string; END: string }) => ({
              title: element.TITLE,
              start: element.START,
              end: element.END,
              backgroundColor: element.TITLE.includes(user.NAZWISKO)
                ? "green"
                : "grey",
            })
          );
          setDates(formattedData);
        })
        .catch((err) => console.log(err));
    };
    fetchDates();
  }, []);

  return (
    <div className="h-5/6 mx-2 mt-12">
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height={"100%"}
        locale={"pl"}
        events={dates}
        weekNumberCalculation={"ISO"}
        displayEventEnd={true}
        eventTimeFormat={{ hour: "numeric", minute: "2-digit" }}
        headerToolbar={{
          start: "prev next",
          center: "title",
          end: "timeGridWeek dayGridMonth",
        }}
      />
    </div>
  );
}

export default MainReadyShifts;
