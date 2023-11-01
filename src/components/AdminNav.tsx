import { DateList } from "../interfaces/DateList";
import { User } from "../interfaces/User";
import { AiOutlineAlignLeft } from "react-icons/ai";
import {apiUrl} from "../utils/apiUrl";

interface Props {
  user: User;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  adminDates: DateList[];
}

function AdminNav({ user, setOpen, open, adminDates }: Props) {
  const sendToDatabase = async () => {
    const response = await fetch(
      `${apiUrl}/api/dates/readyworkshifts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminDates),
      }
    )
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };
  return (
    <nav className="flex w-full justify-between p-2 mb-10">
      <div
        onClick={() => setOpen(!open)}
        className="w-10 h-10 p-3 mx-4 mr-auto bg-green-500 rounded-full text-white hover:bg-green-700"
      >
        <AiOutlineAlignLeft />
      </div>
      <div
        onClick={sendToDatabase}
        className="w-32 mx-10 bg-red-500 rounded-2xl text-center leading-10 font-bold text-white tracking-wide hover:bg-red-700"
      >
        Wyślij
      </div>
      <div className="shadow-lg w-40 p-2 rounded-2xl text-center">
        {`${user.imie} ${user.nazwisko}`}
      </div>
    </nav>
  );
}

export default AdminNav;
