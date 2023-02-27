import React from "react";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form className="flex flex-col gap-2 w-1/4">
        <label>Podaj swoje imie i nazwisko:</label>
        <input
          type="text"
          placeholder="Jan Kowalski"
          className="border-2 border-black rounded-2xl p-2"
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
