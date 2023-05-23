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
    const fetchDateList = async () => {
      await fetch("http://localhost:8800/api/dates/alldates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_ratownika: user.ID_RATOWNIKA }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const formattedData = data.map(
            (element: { ZMIANA: Number; START: string; END: string }) => ({
              title: element.ZMIANA,
              start: element.START,
              end: element.END,
              backgroundColor: "green",
            })
          );
          setDataList([...dateList, ...formattedData]);
        })
        .catch((err) => console.log(err));
    };
    fetchDateList();
  }, []);

  useEffect(() => {
    if (user.IMIE.length === 0) {
      navigate("/");
    }
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
