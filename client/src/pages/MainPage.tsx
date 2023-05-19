import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import MainCalendar from "../components/MainCalendar";
import { useNavigate } from "react-router-dom";

interface props {
  name: string;
}

interface DateList {
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
}

const MainPage = ({ name }: props) => {
  const navigate = useNavigate();
  const [dateList, setDataList] = useState<DateList[]>([]);
  const [declaredHours, setDeclaredHours] = useState(0);
  const [declaredSalary, setDeclaredSalary] = useState(0);

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setDeclaredSalary(declaredHours * 23);
  }, [declaredHours]);

  return (
    <div className="h-screen">
      <MainNav
        name={name}
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
