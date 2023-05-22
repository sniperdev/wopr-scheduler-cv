import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import MainCalendar from "../components/MainCalendar";
import { useNavigate } from "react-router-dom";
interface User {
  ID_RATOWNIKA: string;
  IMIE: string;
  NAZWISKO: string;
  TEL: number;
  EMAIL: string;
}
interface props {
  user: User;
}

interface DateList {
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
}

const MainPage = ({ user }: props) => {
  const navigate = useNavigate();
  const [dateList, setDataList] = useState<DateList[]>([]);
  const [declaredHours, setDeclaredHours] = useState(0);
  const [declaredSalary, setDeclaredSalary] = useState(0);

  useEffect(() => {
    if (user.IMIE.length === 0) {
      navigate("/");
    }
    console.log(user.IMIE.length);
  }, []);

  useEffect(() => {
    setDeclaredSalary(declaredHours * 23);
  }, [declaredHours]);

  return (
    <div className="h-screen">
      <MainNav
        user={user}
        declaredHours={declaredHours}
        declaredSalary={declaredSalary}
        dateList={dateList}
      />
      <MainCalendar
        setDeclaredHours={setDeclaredHours}
        declaredHours={declaredHours}
        setDataList={setDataList}
        dateList={dateList}
      />
    </div>
  );
};

export default MainPage;
