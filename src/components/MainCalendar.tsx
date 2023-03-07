import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import MainModal from "./MainModal";

interface DateClickInfo {
  date: Date;
  dateStr: string;
  jsEvent: MouseEvent;
}

const MainCalendar = () => {
  const [nextMonthDate, setNextMonthDate] = useState("");
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    transform: "translate(0,0)",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedDate, setClickedDate] = useState("");
  const [dataList, setDataList] = useState([{}]);
  const [option, setOption] = useState("1");
  const [weekend, setWeekend] = useState(false);

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
  }, []);

  const handleDateClick = (info: DateClickInfo) => {
    if (
      info.jsEvent.x > (2 / 3) * window.innerWidth ||
      info.jsEvent.y > (3 / 4) * window.innerHeight
    )
      setMousePosition({
        x: info.jsEvent.x,
        y: info.jsEvent.y,
        transform: "translate(-100%, -100%)",
      });
    else
      setMousePosition({
        x: info.jsEvent.x,
        y: info.jsEvent.y,
        transform: "",
      });
    setClickedDate(info.dateStr);
    setIsModalOpen(true);
  };

  const handleDate = (e: React.FormEvent) => {
    e.preventDefault();
    let shiftStart: string;
    let shiftEnd: string;

    if (weekend && option === "1") {
      shiftStart = "07:00";
      shiftEnd = "15:00";
    } else if (!weekend && option === "1") {
      shiftStart = "06:00";
      shiftEnd = "15:00";
    } else if (!weekend && option === "2") {
      shiftStart = "08:00";
      shiftEnd = "15:00";
    } else {
      shiftStart = "15:00";
      shiftEnd = "22:00";
    }

    setDataList([
      ...dataList,
      {
        title: option,
        start: clickedDate + "T" + shiftStart,
        end: clickedDate + "T" + shiftEnd,
      },
    ]);
    setOption("1");
    setIsModalOpen(false);
    setWeekend(false);
  };

  return (
    <>
      <section className="h-5/6 mx-2 mt-12 relative">
        {nextMonthDate ? (
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height={"100%"}
            locale={"pl"}
            initialDate={nextMonthDate}
            dateClick={handleDateClick}
            events={dataList}
            weekNumberCalculation={"ISO"}
            headerToolbar={{ start: "", center: "title", end: "" }}
          />
        ) : (
          <p>Nie udało się pobrać daty</p>
        )}
        {isModalOpen && (
          <MainModal
            setOption={setOption}
            handledDate={handleDate}
            onClose={setIsModalOpen}
            weekend={weekend}
            clickedDate={clickedDate}
            setWeekend={setWeekend}
            style={{
              top: mousePosition.y,
              left: mousePosition.x,
              position: "absolute",
              transform: mousePosition.transform,
            }}
          />
        )}
      </section>
    </>
  );
};

export default MainCalendar;
