import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import MainCalendar from "../components/MainCalendar";
import { useNavigate } from "react-router-dom";

interface props {
  name: string;
}

interface DataList {
  title: string;
  start: string;
  end: string;
}

const MainPage = ({ name }: props) => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState<DataList[]>([]);
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
        dataList={dataList}
      />
      <MainCalendar
        setDeclaredHours={setDeclaredHours}
        declaredHours={declaredHours}
        setDataList={setDataList}
        dataList={dataList}
      />
    </div>
  );
};

export default MainPage;
