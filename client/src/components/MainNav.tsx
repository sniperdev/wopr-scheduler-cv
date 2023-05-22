import React from "react";
import { IoSend } from "react-icons/all";
import exportFromJSON from "export-from-json";

interface DateList {
  title: string;
  start: string;
  end: string;
}
interface User {
  ID_RATOWNIKA: string;
  IMIE: string;
  NAZWISKO: string;
  TEL: number;
  EMAIL: string;
}
interface Props {
  user: User;
  declaredHours: number;
  declaredSalary: number;
  dateList: DateList[];
}

const MainNav = ({ user, declaredHours, declaredSalary, dateList }: Props) => {
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
      <div
        onClick={exportToExcel}
        className="ml-auto w-10 h-10 p-3 mx-4 bg-green-600 rounded-full text-white"
      >
        <IoSend></IoSend>
      </div>
      <div className="shadow-lg w-40 p-2 rounded-2xl text-center">
        {`${user.IMIE} ${user.NAZWISKO}`}
      </div>
    </nav>
  );
};

export default MainNav;
