import React from "react";
import { useNavigate } from "react-router-dom";

interface props {
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const LoginPage = ({ setName }: props) => {
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/app");
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={(e) => handleLogin(e)}
        className="flex flex-col gap-2 w-1/4"
      >
        <label>Podaj swoje imię i nazwisko:</label>
        <input
          type="text"
          placeholder="Jan Kowalski"
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-black rounded-2xl p-2" required
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
