import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import MainCalendar from "../components/MainCalendar";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";
import { DateList } from "../interfaces/DateList";
interface props {
  user: User;
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
