import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";
import AdminNav from "../components/AdminNav";
import AdminShiftsList from "../components/AdminShiftsList";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { allDates } from "../interfaces/allDates";
import { DateList } from "../interfaces/DateList";
import { EventClickArg } from "@fullcalendar/core";
import {apiUrl} from "../utils/apiUrl";

interface props {
  user: User;
}
export default function AdminPanel({ user }: props) {
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [allFetchedDates, setAllFetchedDates] = useState<allDates[]>([]);
  const [adminDates, setAdminDates] = useState<DateList[]>([]);

  useEffect(() => {
    if (user.imie.length === 0) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    const fetchAdminDates = async () => {
      await fetch(`${apiUrl}/api/gotowezmiany/getreadysshifts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const formattedData = data.map(
            (element: {
              start: string;
              end: string;
              id_ratownika: number;
              title: string;
            }) => ({
              start: element.start,
              end: element.end,
              id_ratownika: element.id_ratownika,
              title: element.title,
            })
          );
          setAdminDates([...adminDates, ...formattedData]);
        })
        .catch((err) => console.log(err));
    };
    fetchAdminDates();
  }, []);
  useEffect(() => {
    const fetchAllDates = async () => {
      await fetch(`${apiUrl}/api/gotowezmiany/getunaddedshifts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.map(
            (element: {
              zmiana: Number;
              start: string;
              end: string;
              id_ratownika: number;
              imie: string;
              nazwisko: string;
            }) => ({
              id_ratownika: element.id_ratownika,
              title: element.zmiana,
              imie: element.imie,
              nazwisko: element.nazwisko,
              start: element.start,
              end: element.end,
            })
          );
          setAllFetchedDates([...allFetchedDates, ...formattedData]);
        })
        .catch((err) => console.log(err));
    };
    fetchAllDates();
  }, []);
  const deleteDate = (info: EventClickArg) => {
    const event = info.event;
    if (event.start) {
      const startEvent = event.startStr.toString();
      const endEvent = event.endStr.toString();

      const parts = event.title.split(" - ");
      const zmiana = parts[0];
      const name = parts[1].split(" ")[0];
      const surname = parts[1].split(" ")[1];

      const element = adminDates.filter((element) => {
        return (
          element.title === event.title &&
          element.start === startEvent.slice(0, 16)
        );
      });
      setAdminDates(
        adminDates.filter((date) => {
          return !(
            date.start === startEvent.slice(0, 16) && date.title === event.title
          );
        })
      );

      setAllFetchedDates([
        ...allFetchedDates,
        {
          title: Number(zmiana),
          imie: name,
          nazwisko: surname,
          start: startEvent.slice(0, 16),
          end: endEvent.slice(0, 16),
          id_ratownika: element[0].id_ratownika,
        },
      ]);
    }
  };
  return (
    <div className="flex h-screen w-screen font-bold">
      {open && (
        <AdminShiftsList
          setAllFetchedDates={setAllFetchedDates}
          allFetchedDates={allFetchedDates}
          setAdminDates={setAdminDates}
          adminDates={adminDates}
        />
      )}
      <div className="w-full h-5/6 p-2">
        <AdminNav
          user={user}
          open={open}
          setOpen={setOpen}
          adminDates={adminDates}
        />
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height={"100%"}
          locale={"pl"}
          weekNumberCalculation={"ISO"}
          displayEventEnd={true}
          events={adminDates}
          eventTimeFormat={{ hour: "numeric", minute: "2-digit" }}
          headerToolbar={{
            start: "prev next",
            center: "title",
            end: "timeGridWeek dayGridMonth",
          }}
          eventClick={deleteDate}
        />
      </div>
    </div>
  );
}
