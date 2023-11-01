import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";
import {apiUrl} from "../utils/apiUrl";

interface props {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const LoginPage = ({ setUser }: props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<number>();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`${apiUrl}/api/ratownicy/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: name, haslo: password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setError(response.status);
          return response.text().then((errorMessage) => {
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setUser(data.data);
        if (data.data.admin === 1) navigate("/adminpanel");
        else navigate("/app");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <p>Aby zalogować się wpisz igi@wp.pl oraz 1234</p>
      <p>Aby zalogować się wpisz anna@example.com oraz 5678</p>
      {error === 400 ? (
        <p className="text-red-700 font-bold">Błędne hasło!</p>
      ) : null}
      {error === 404 ? (
        <p className="text-red-700 font-bold">Nie ma takiego użytkownika!</p>
      ) : null}
      <form
        onSubmit={(e) => handleLogin(e)}
        className="flex flex-col gap-2 w-1/4"
      >
        <label>Podaj swój email oraz hasło:</label>
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-black rounded-2xl p-2"
          required
        />
        <input
          type="password"
          placeholder="Hasło"
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
