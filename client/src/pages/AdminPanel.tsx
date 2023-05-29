import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";
import AdminNav from "../components/AdminNav";
import AdminShiftsList from "../components/AdminShiftsList";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

interface props {
  user: User;
}
interface allDates {
  ZMIANA: Number;
  START: string;
  END: string;
  ID_RATOWNIKA: number;
  IMIE: string;
  NAZWISKO: string;
}
export default function AdminPanel({ user }: props) {
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [allDate, setAllDate] = useState<allDates[]>([]);

  useEffect(() => {
    if (user.IMIE.length === 0) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const fetchAllDates = async () => {
      await fetch("http://localhost:8800/api/dates/alldatesadmin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.map(
            (element: {
              ZMIANA: Number;
              start: string;
              end: string;
              ID_RATOWNIKA: number;
              imie: string;
              nazwisko: string;
            }) => ({
              idRatownika: element.ID_RATOWNIKA,
              title: element.ZMIANA,
              imie: element.imie,
              nazwisko: element.nazwisko,
              start: element.start,
              end: element.end,
            })
          );
          setAllDate([...allDate, ...formattedData]);
          console.log(data);
        })
        .catch((err) => console.log(err));
    };
    fetchAllDates();
  }, []);
  return (
    <div className="flex h-screen w-screen">
      {open && <AdminShiftsList />}
      <div className="w-full h-5/6">
        <AdminNav user={user} open={open} setOpen={setOpen} />
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height={"100%"}
          locale={"pl"}
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
    </div>
  );
}
