import React from "react";
import { DateList } from "../interfaces/DateList";
import { allDates } from "../interfaces/allDates";

interface Props {
  title: number;
  name: string;
  surname: string;
  start: string;
  end: string;
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
  end,
  setAdminDates,
  adminDates,
  setAllFetchedDates,
  allFetchedDates,
}: Props) => {
  const handleClick = () => {
    const element = allFetchedDates.find((e) => {
      return e.nazwisko === surname && e.start === start;
    });
    if (element) {
      setAdminDates([
        ...adminDates,
        {
          title: `${title} - ${name} ${surname}`,
          start: start,
          end: end,
          id_ratownika: element.id_ratownika,
        },
      ]);
    }
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
