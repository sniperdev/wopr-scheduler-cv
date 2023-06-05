import React from "react";
import { DateList } from "../interfaces/DateList";
import { allDates } from "../interfaces/allDates";

interface props {
  title: number;
  name: string;
  surname: string;
  start: string;
  setAdminDates: React.Dispatch<React.SetStateAction<DateList[]>>;
  adminDates: DateList[];
}

function AdminOneShift({
  title,
  name,
  surname,
  start,
  setAdminDates,
  adminDates,
}: props) {
  const addDate = () => {
    setAdminDates([
      ...adminDates,
      { title: `${title} - ${name} ${surname}`, start: start, end: start },
    ]);
  };
  return (
    <div
      onClick={addDate}
      className="bg-green-700 rounded my-2 p-2"
    >{`${title} - ${name} ${surname} (${start.slice(0, 10)})`}</div>
  );
}

export default AdminOneShift;
