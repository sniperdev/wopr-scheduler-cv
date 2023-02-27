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
    <>
      <MainNav name={name} />
      <MainCalendar />
    </>
  );
};

export default MainPage;
