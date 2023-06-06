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
  setAllFetchedDates: React.Dispatch<React.SetStateAction<allDates[]>>;
  allFetchedDates: allDates[];
}

const AdminOneShift = ({
  title,
  name,
  surname,
  start,
  setAdminDates,
  adminDates,
  setAllFetchedDates,
  allFetchedDates,
}: props) => {
  const handleClick = () => {
    setAdminDates([
      ...adminDates,
      { title: `${title} - ${name} ${surname}`, start: start, end: start },
    ]);
    setAllFetchedDates(
      allFetchedDates.filter((element) => {
        return !(element.nazwisko === surname && element.start === start);
      })
    );
  };
  return (
    <div
      onClick={handleClick}
      className="bg-green-700 rounded my-2 p-2"
    >{`${title} - ${name} ${surname} (${start.slice(0, 10)})`}</div>
  );
};

export default AdminOneShift;
