import React from "react";
import { allDates } from "../interfaces/allDates";
import AdminOneShift from "./AdminOneShift";

interface props {
  allDates: allDates[];
}
function AdminShiftsList({ allDates }: props) {
  return (
    <div className="w-1/3 h-screen p-2 py-4">
      <h2>Choose Shifts:</h2>
      {allDates.map((element, index) => (
        <AdminOneShift
          key={index}
          title={element.title}
          name={element.imie}
          surname={element.nazwisko}
          start={element.start}
        />
      ))}
    </div>
  );
}

export default AdminShiftsList;
