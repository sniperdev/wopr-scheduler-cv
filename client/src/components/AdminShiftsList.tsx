import React from "react";
import { allDates } from "../interfaces/allDates";
import AdminOneShift from "./AdminOneShift";
import { DateList } from "../interfaces/DateList";

interface props {
  allFetchedDates: allDates[];
  setAdminDates: React.Dispatch<React.SetStateAction<DateList[]>>;
  adminDates: DateList[];
}
function AdminShiftsList({
  allFetchedDates,
  setAdminDates,
  adminDates,
}: props) {
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
          setAdminDates={setAdminDates}
          adminDates={adminDates}
        />
      ))}
    </div>
  );
}

export default AdminShiftsList;
