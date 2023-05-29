import React from "react";
import { allDates } from "../interfaces/allDates";

interface props {
  allDates: allDates[];
}
function AdminShiftsList({ allDates }: props) {
  return (
    <div className="w-1/3 h-screen p-2 py-4">
      <h2>Choose Shifts:</h2>
      {allDates.map((d, index) => (
        <div
          key={index}
          className="bg-green-700 rounded my-2 p-2"
        >{`${d.title} - ${d.imie} ${d.nazwisko}`}</div>
      ))}
    </div>
  );
}

export default AdminShiftsList;
