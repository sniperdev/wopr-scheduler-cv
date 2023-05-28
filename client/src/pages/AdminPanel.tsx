import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";

interface props {
  user: User;
}

export default function AdminPanel({ user }: props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (user.IMIE.length === 0) {
      navigate("/");
    }
  }, []);
  return <div>AdminPanel</div>;
}
