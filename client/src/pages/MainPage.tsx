import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import MainCalendar from "../components/MainCalendar";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";
import { DateList } from "../interfaces/DateList";
import MainReadyShifts from "../components/MainReadyShifts";
import {apiUrl} from "../utils/apiUrl";
interface props {
  user: User;
}

const MainPage = ({ user }: props) => {
  const navigate = useNavigate();
  const [dateList, setDataList] = useState<DateList[]>([]);
  const [declaredHours, setDeclaredHours] = useState(0);
  const [declaredSalary, setDeclaredSalary] = useState(0);
  const [readyshifts, setReadyShifts] = useState(false);

  useEffect(() => {
    const fetchDateList = async () => {
      await fetch(`${apiUrl}/api/daty/alldates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_ratownika: user.id_ratownika.toString() }),
      })
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.map(
            (element: { zmiana: string; start: string; end: string }) => ({
              title: element.zmiana,
              start: element.start,
              end: element.end,
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
    if (user.imie.length === 0) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setDeclaredSalary(declaredHours * 23);
  }, [declaredHours]);

  return (
    <div className="h-screen font-bold">
      <MainNav
        user={user}
        declaredHours={declaredHours}
        declaredSalary={declaredSalary}
        dateList={dateList}
        setReadyShifts={setReadyShifts}
      />
      {readyshifts ? (
        <MainReadyShifts user={user} />
      ) : (
        <MainCalendar
          setDeclaredHours={setDeclaredHours}
          declaredHours={declaredHours}
          setDataList={setDataList}
          dateList={dateList}
          user={user}
        />
      )}
    </div>
  );
};

export default MainPage;
