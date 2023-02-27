import React from "react";
import MainNav from "../components/MainNav";

interface props {
  name: string;
}

const MainPage = ({ name }: props) => {
  return (
    <>
      <MainNav name={name} />
    </>
  );
};

export default MainPage;
