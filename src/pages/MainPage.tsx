import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import MainCalendar from "../components/MainCalendar";
import { useNavigate } from "react-router-dom";

interface props {
  name: string;
}

const MainPage = ({ name }: props) => {
  const navigate = useNavigate();
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
      />
      <MainCalendar
        setDeclaredHours={setDeclaredHours}
        declaredHours={declaredHours}
      />
    </div>
  );
};

export default MainPage;
