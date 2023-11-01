import React from "react";
import { allDates } from "../interfaces/allDates";
import AdminOneShift from "./AdminOneShift";
import { DateList } from "../interfaces/DateList";

interface Props {
  setAllFetchedDates: React.Dispatch<React.SetStateAction<allDates[]>>;
  allFetchedDates: allDates[];
  setAdminDates: React.Dispatch<React.SetStateAction<DateList[]>>;
  adminDates: DateList[];
}
const AdminShiftsList = ({
  setAllFetchedDates,
  allFetchedDates,
  setAdminDates,
  adminDates,
}: Props) => {
  return (
    <div className="w-1/3 h-screen p-2 py-4">
      <h2>Choose Shifts:</h2>
      {allFetchedDates.map((element, index) => (
        <AdminOneShift
          key={index}
          title={element.title}
          name={element.imie}
          surname={element.nazwisko}
          start={element.start}
          end={element.end}
          setAdminDates={setAdminDates}
          adminDates={adminDates}
          setAllFetchedDates={setAllFetchedDates}
          allFetchedDates={allFetchedDates}
        />
      ))}
    </div>
  );
};
export default AdminShiftsList;
