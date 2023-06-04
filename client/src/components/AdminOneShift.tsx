import React from "react";

interface props {
  key: number;
  title: number;
  name: string;
  surname: string;
  start: string;
}

function AdminOneShift({ key, title, name, surname, start }: props) {
  return (
    <div
      key={key}
      className="bg-green-700 rounded my-2 p-2"
    >{`${title} - ${name} ${surname} (${start.slice(0, 10)})`}</div>
  );
}

export default AdminOneShift;
