import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import MainModal from "./MainModal";
import { EventClickArg } from "@fullcalendar/core";
import { DateList } from "../interfaces/DateList";
import { User } from "../interfaces/User";

interface DateClickInfo {
  date: Date;
  dateStr: string;
  jsEvent: MouseEvent;
}

interface Props {
  setDeclaredHours: React.Dispatch<React.SetStateAction<number>>;
  declaredHours: number;
  dateList: DateList[];
  setDataList: React.Dispatch<React.SetStateAction<DateList[]>>;
  user: User;
}

const MainCalendar = ({
  setDeclaredHours,
  declaredHours,
  setDataList,
  dateList,
  user,
}: Props) => {
  const [nextMonthDate, setNextMonthDate] = useState("");
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    transform: "translate(0,0)",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedDate, setClickedDate] = useState("");

  const [option, setOption] = useState("");
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
  const [optionsToShow, setOptionsToShow] = useState<string[]>([]);
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
    setOptionsToShow([]);
    const filteredList = dateList.filter((item) =>
      item.start.includes(clickedDate)
    );
    setOptionsToShow(filteredList.map((item) => item.title));
    setIsModalOpen(true);
  };
  const declaredHoursHandle = () => {
    setDeclaredHours(0);
    dateList.forEach((element) => {
      const start = new Date(element.start);
      const end = new Date(element.end);
      setDeclaredHours(declaredHours + (end.getHours() - start.getHours()));
    });
  };
  const addData = async (shiftStart: string, shiftEnd: string) => {
    await fetch("http://localhost:8800/api/dates/adddate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_ratownika: user.ID_RATOWNIKA,
        start: clickedDate + "T" + shiftStart,
        end: clickedDate + "T" + shiftEnd,
        zmiana: option,
      }),
    });
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
    } else if (option === "3") {
      shiftStart = "15:00";
      shiftEnd = "22:00";
    } else {
      setIsModalOpen(false);
      setWeekend(false);
      setOptionsToShow([]);
      return;
    }
    if (clickedDate > nextMonthDate) {
      setDataList([
        ...dateList,
        {
          title: option,
          start: clickedDate + "T" + shiftStart,
          end: clickedDate + "T" + shiftEnd,
          backgroundColor: "green",
        },
      ]);
    } else {
      setDataList([
        ...dateList,
        {
          title: option,
          start: clickedDate + "T" + shiftStart,
          end: clickedDate + "T" + shiftEnd,
          backgroundColor: "red",
        },
      ]);
    }
    addData(shiftStart, shiftEnd);
    setOption("");
    setIsModalOpen(false);
    setWeekend(false);
    setOptionsToShow([]);
  };

  const deleteDatefromDB = async (formattedData: string) => {
    await fetch("http://localhost:8800/api/dates/removedate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_ratownika: user.ID_RATOWNIKA,
        start: formattedData,
      }),
    });
  };
  const deleteDate = (e: EventClickArg) => {
    const formattedDate = e.event.startStr.slice(0, 16);
    setDataList((dataList) =>
      dataList.filter((data) => data.start !== formattedDate)
    );
    console.log(formattedDate);
    deleteDatefromDB(formattedDate);
  };
  useEffect(() => {
    declaredHoursHandle();
  }, [dateList]);

  return (
    <>
      <section className="h-5/6 mx-2 mt-12 relative">
        {nextMonthDate ? (
          <FullCalendar
            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height={"100%"}
            locale={"pl"}
            initialDate={nextMonthDate}
            dateClick={handleDateClick}
            events={dateList}
            weekNumberCalculation={"ISO"}
            displayEventEnd={true}
            eventTimeFormat={{ hour: "numeric", minute: "2-digit" }}
            headerToolbar={{
              start: "prev next",
              center: "title",
              end: "timeGridWeek dayGridMonth",
            }}
            eventClick={(e) => deleteDate(e)}
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
            dateList={dateList}
            style={{
              top: mousePosition.y,
              left: mousePosition.x,
              position: "absolute",
              transform: mousePosition.transform,
            }}
            optionsToShow={optionsToShow}
            nextMonthDate={nextMonthDate}
          />
        )}
      </section>
    </>
  );
};

export default MainCalendar;
