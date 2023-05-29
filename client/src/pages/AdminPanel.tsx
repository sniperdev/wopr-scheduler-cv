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

export default function AdminPanel({ user }: props) {
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (user.IMIE.length === 0) {
      navigate("/");
    }
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
