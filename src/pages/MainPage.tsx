import React, { useEffect } from "react";
import MainNav from "../components/MainNav";
import MainCalendar from "../components/MainCalendar";
import { useNavigate } from "react-router-dom";

interface props {
  name: string;
}

const MainPage = ({ name }: props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen">
      <MainNav name={name} />
      <MainCalendar />
    </div>
  );
};

export default MainPage;
