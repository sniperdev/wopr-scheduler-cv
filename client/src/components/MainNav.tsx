import React from "react";
import { IoSend } from "react-icons/io5";
import exportFromJSON from "export-from-json";
import { User } from "../interfaces/User";
import { DateList } from "../interfaces/DateList";

interface Props {
  user: User;
  declaredHours: number;
  declaredSalary: number;
  dateList: DateList[];
  setReadyShifts: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainNav = ({
  user,
  declaredHours,
  declaredSalary,
  dateList,
  setReadyShifts,
}: Props) => {
  const exportToExcel = () => {
    exportFromJSON({
      data: dateList,
      fileName: "test",
      exportType: "xls",
    });
  };
  return (
    <nav className="flex p-2">
      <div className="shadow-lg w-40 p-2 mx-2 rounded-2xl">
        Liczba godzin: {declaredHours}
      </div>
      <div className="shadow-lg w-52 p-2 mx-2 rounded-2xl">
        Wynagrodzenie: {declaredSalary} zł
      </div>

      <div className="shadow-lg w-40 p-2 rounded-2xl text-center">
        {`${user.IMIE} ${user.NAZWISKO}`}
      </div>
      <div className="ml-auto">
        <button
          onClick={() => setReadyShifts(false)}
          className="px-4 mx-2 bg-slate-800 text-white"
        >
          Moje zmiany
        </button>
        <button
          onClick={() => setReadyShifts(true)}
          className="px-4 mx-2 bg-slate-800 text-white"
        >
          Gotowy grafik
        </button>
      </div>
    </nav>
  );
};

export default MainNav;
