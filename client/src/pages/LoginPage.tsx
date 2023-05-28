import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";

interface props {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const LoginPage = ({ setUser }: props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const respone = await fetch("http://localhost:8800/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: name, HASLO: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        if (data.ADMIN === 1) navigate("/adminpanel");
        else navigate("/app");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={(e) => handleLogin(e)}
        className="flex flex-col gap-2 w-1/4"
      >
        <label>Podaj swój email oraz hasło:</label>
        <input
          type="email"
          placeholder="youremail@site.com"
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-black rounded-2xl p-2"
          required
        />
        <input
          type="password"
          placeholder="12345678"
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-black rounded-2xl p-2"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white rounded-2xl p-2"
        >
          Akceptuj!
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
